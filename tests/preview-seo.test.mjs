import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {parse} from 'parse5';
import vm from 'node:vm';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const routes=['','services','prices','silk','about','specialists','reviews','faq','contacts','booking'];
const base='https://efilym89.github.io/mainsiteannaelle/';
function nodes(html){const all=[];const walk=n=>{all.push(n);for(const c of n.childNodes||[])walk(c);};walk(parse(html));return all;}
const attr=(node,name)=>node.attrs?.find(a=>a.name===name)?.value;
const docs=[];
for(const lang of ['ru','en','uz'])for(const route of routes){const relative=(lang==='ru'?'':lang+'/')+(route?route+'/':'');const html=readFileSync(path.join(root,'docs',relative,'index.html'),'utf8');docs.push({lang,route,relative,html,nodes:nodes(html)});}
test('All 30 pages contain language-specific static content and search metadata',()=>{
 const titles=new Set(),descriptions=new Set();
 for(const doc of docs){const find=(tag,name,value)=>doc.nodes.find(n=>n.tagName===tag&&attr(n,name)===value);
  assert.equal(attr(doc.nodes.find(n=>n.tagName==='html'),'lang'),doc.lang);
  assert.equal(doc.nodes.filter(n=>n.tagName==='h1').length,1);
  assert.ok(doc.nodes.find(n=>n.tagName==='main')?.childNodes.length>0);
  assert.match(attr(find('meta','name','robots'),'content'),/noindex/);
  assert.equal(attr(find('link','rel','canonical'),'href'),base+doc.relative);
  for(const lang of ['ru','en','uz'])assert.equal(attr(find('link','hreflang',lang),'href'),base+(lang==='ru'?'':lang+'/')+(doc.route?doc.route+'/':''));
  const description=attr(find('meta','name','description'),'content');assert.ok(description.length>60);descriptions.add(description);
  const title=doc.nodes.find(n=>n.tagName==='title').childNodes[0].value;assert.ok(title.includes('Annaelle'));titles.add(title);
  if(doc.lang!=='ru')assert.doesNotMatch(description,/[А-Яа-яЁё]/);
  const ogImage=attr(find('meta','property','og:image'),'content');assert.ok(ogImage.startsWith(base+'assets/'));assert.ok(existsSync(path.join(root,'docs',ogImage.slice(base.length))),ogImage);
  const ld=find('script','type','application/ld+json');assert.equal(JSON.parse(ld.childNodes[0].value)['@graph'].filter(n=>n['@type']==='HealthAndBeautyBusiness').length,2);
 }
 assert.equal(titles.size,30);assert.equal(descriptions.size,30);
});
test('All package prices are in initial HTML, without clicking or JavaScript',()=>{
 for(const doc of docs.filter(d=>d.route==='prices')){
  assert.equal(doc.nodes.filter(n=>attr(n,'class')==='package-card').length,20);
  for(const count of [3,5,7,9])assert.ok(doc.nodes.find(n=>attr(n,'id')==='course-'+count));
  assert.equal(doc.nodes.filter(n=>attr(n,'class')==='zone-group').length,4);
 }
});
test('Before/after originals have no image sources until explicit reveal',()=>{
 for(const doc of docs.filter(d=>['','reviews'].includes(d.route))){
  const resultImages=doc.nodes.filter(n=>n.tagName==='img'&&attr(n,'data-result-src'));
  assert.equal(resultImages.length,12);
  for(const img of resultImages){assert.match(attr(img,'src'),/\/result-previews\//);assert.doesNotMatch(attr(img,'data-result-src'),/result-previews/);}
  assert.doesNotMatch(doc.html,/result-photo-links/);
 }
});
test('Responsive photo candidates exist and stay within generated assets',()=>{
 for(const doc of docs)for(const img of doc.nodes.filter(n=>n.tagName==='img'&&attr(n,'srcset'))){
  assert.ok(attr(img,'sizes'));
  for(const candidate of attr(img,'srcset').split(',')){const [url,width]=candidate.trim().split(/\s+/);assert.match(width,/^\d+w$/);assert.ok(url.startsWith('/mainsiteannaelle/assets/responsive/'));assert.ok(existsSync(path.join(root,'docs',url.slice('/mainsiteannaelle/'.length))));}
 }
});
test('Unenhanced forms cannot send contact data to the static host',()=>{
 for(const doc of docs){const forms=doc.nodes.filter(n=>n.tagName==='form');assert.ok(forms.length);for(const form of forms){const fields=form.childNodes.find(n=>n.tagName==='fieldset');assert.ok(fields);assert.equal(attr(fields,'disabled'),'');assert.ok(form.childNodes.find(n=>n.tagName==='a'&&attr(n,'href')==='https://t.me/annaellelaser'));}}
});
test('Telegram drafts preserve first-visit conditions and do not send messages',()=>{
 const app=readFileSync(path.join(root,'preview-site/app.js'),'utf8'),opened=[];
 const context={selected:{title:'Подмышки + бикини',price:'220 000',kind:'offer'},ANNAELLE_CONFIG:{telegramUsername:'annaellelaser'},translate:v=>v,window:{open:(...args)=>opened.push(args)}};vm.createContext(context);
 vm.runInContext(app.slice(app.indexOf('function translateSelection'),app.indexOf('function openBooking'))+app.slice(app.indexOf('function bookingMessage'),app.indexOf('function setResultVisibility')),context);
 vm.runInContext('telegram(bookingMessage())',context);
 assert.equal(opened.length,1);const url=new URL(opened[0][0]);assert.equal(url.origin,'https://t.me');assert.equal(url.pathname,'/annaellelaser');assert.match(url.searchParams.get('text'),/только на первое посещение/);assert.match(url.searchParams.get('text'),/220 000/);assert.equal(opened[0][2],'noopener');
});
