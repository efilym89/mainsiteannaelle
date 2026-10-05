import { cp, lstat, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import vm from 'node:vm';
import { parse, parseFragment, serialize } from 'parse5';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=path.join(root,'preview-site'),output=path.join(root,'docs');
// The GitHub output is always a test. A production release needs its own origin and configuration.
const basePath='/mainsiteannaelle',origin='https://efilym89.github.io';
const routes=['','services','prices','silk','about','specialists','reviews','faq','contacts','booking'];
const dataFiles=['config.js','original-data.js','catalog.js','data.js','translations.js','silk-content.js','silk-translations.js','silk-page.js','full-res.js','oct-translations.js','audit-translations.js','seo-data.js','responsive-media.js'];
const runtimeFiles=['index.html','styles.css',...dataFiles,'app.js'];
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const routeUrl=(route,locale='ru')=>basePath+'/'+(locale==='ru'?'':locale+'/')+(route?route+'/':'');
if(path.dirname(output)!==root||path.basename(output)!=='docs')throw Error('Invalid preview output');
const existing=await lstat(output).catch(error=>{if(error.code!=='ENOENT')throw error;});
if(existing?.isSymbolicLink())throw Error('Preview output must not be a symlink');
const files=Object.fromEntries(await Promise.all(runtimeFiles.map(async name=>[name,await readFile(path.join(source,name),'utf8')])));
for(const name of runtimeFiles.filter(name=>name.endsWith('.js')))execFileSync(process.execPath,['--check',path.join(source,name)],{stdio:'inherit'});
if(!/testMode:\s*true/.test(files['config.js']))throw Error('GitHub preview must remain in test mode');
if(files['app.js'].includes('result-photo-links'))throw Error('Before/after fullscreen links must be absent');
const boundary='document.documentElement.lang=locale;';
if(!files['app.js'].includes(boundary))throw Error('Renderer boundary missing');
const renderer=files['app.js'].slice(0,files['app.js'].indexOf(boundary));
const versions=Object.fromEntries(runtimeFiles.map(name=>[name,createHash('sha256').update(files[name].replace(/\r\n/g,'\n')).digest('hex').slice(0,12)]));
const template=files['index.html'].replace(/\b(href|src)="\/([^"?]+)"/g,(_,attr,name)=>attr+'="'+basePath+'/'+name+(versions[name]?'?v='+versions[name]:'')+'"');
const css=files['styles.css'].replace(/url\((['"]?)\/(?!\/)/g,'url($1'+basePath+'/');
function visit(node,callback){callback(node);for(const child of node.childNodes||[])visit(child,callback);}
function translateHtml(html,dictionary){
 const fragment=parseFragment(html);visit(fragment,node=>{
  if(node.nodeName==='#text'&&!['script','style'].includes(node.parentNode?.tagName)){
   const text=node.value.trim();
   if(dictionary[text])node.value=node.value.replace(text,dictionary[text]);
   else if(/^\d+ (процедуры|процедур)$/.test(text))node.value=node.value.replace(/(процедуры|процедур)/,word=>dictionary[word]||word);
  }
  for(const attr of node.attrs||[])if(['aria-label','placeholder','alt'].includes(attr.name)&&dictionary[attr.value])attr.value=dictionary[attr.value];
 });return serialize(fragment);
}
function schema(context,route,locale){
 const home=origin+routeUrl('',locale),url=origin+routeUrl(route,locale);
 return {'@context':'https://schema.org','@graph':[
  {'@type':'Organization','@id':origin+basePath+'/#organization',name:'Annaelle',url:home,logo:origin+basePath+'/assets/logo-horizontal.svg',sameAs:[context.SITE_CONTACTS.instagram,'https://t.me/annaelle_uz']},
  ...[['Шота Руставели, 33','238400073401'],['Карасу, 31','198869898947']].map(([address,id],i)=>({'@type':'HealthAndBeautyBusiness','@id':origin+basePath+'/#studio-'+(i+1),name:'Annaelle — '+address,url:origin+routeUrl('contacts',locale),parentOrganization:{'@id':origin+basePath+'/#organization'},address:{'@type':'PostalAddress',streetAddress:address,addressLocality:'Tashkent',addressCountry:'UZ'},hasMap:'https://yandex.ru/maps/org/annaelle/'+id+'/'})),
  {'@type':'WebPage','@id':url+'#webpage',url,name:context.SEO_DATA[locale][route||'home'].title,inLanguage:locale,isPartOf:{'@id':origin+basePath+'/#website'}},
  {'@type':'WebSite','@id':origin+basePath+'/#website',name:'Annaelle',url:origin+basePath+'/',publisher:{'@id':origin+basePath+'/#organization'}}
 ]};
}
await rm(output,{recursive:true,force:true});await mkdir(output,{recursive:true});
for(const name of runtimeFiles)await cp(path.join(source,name),path.join(output,name));
await cp(path.join(source,'assets'),path.join(output,'assets'),{recursive:true});
await writeFile(path.join(output,'styles.css'),css);
await writeFile(path.join(output,'config.js'),files['config.js']+'\nwindow.ANNAELLE_CONFIG.basePath = '+JSON.stringify(basePath)+';\n');
const pages=[];
for(const locale of ['ru','en','uz'])for(const route of routes){
 const context={URLSearchParams,location:{pathname:routeUrl(route,locale),search:'',hash:''}};context.window=context;vm.createContext(context);
 for(const name of dataFiles)vm.runInContext(files[name],context,{filename:name});context.ANNAELLE_CONFIG.basePath=basePath;
 vm.runInContext(renderer,context,{filename:'app-renderer.js'});
 let body=vm.runInContext("header()+'<main id=\"main\">'+pageContent()+'</main>'+footer()+dock()+dialogs()",context);
 const dictionary=locale==='ru'?{}:{...context.BASE_TRANSLATIONS[locale],...context.EXTRA_TRANSLATIONS?.[locale],...context.SILK_TRANSLATIONS?.[locale],...context.OCT_TRANSLATIONS?.[locale],...context.AUDIT_TRANSLATIONS?.[locale]};
 body=translateHtml(body,dictionary);
 const metadata=context.SEO_DATA[locale][route||'home'],url=origin+routeUrl(route,locale),title=metadata.title+' · '+(dictionary['Прототип']||'Прототип');
 const hero=(route?context.PAGE_INFO[route].image:context.CATALOG.offers[0].image).replace(/^assets\//,'');
 const preview=context.RESPONSIVE_PHOTOS[hero]?.variants.find(v=>v.width>=1200)||context.RESPONSIVE_PHOTOS[hero]?.variants.at(-1);
 const imageUrl=origin+basePath+'/assets/'+(preview?.src||hero);
 const meta='<link rel="canonical" href="'+url+'">\n'+['ru','en','uz'].map(lang=>'<link rel="alternate" hreflang="'+lang+'" href="'+origin+routeUrl(route,lang)+'">').join('\n')+
 '\n<link rel="alternate" hreflang="x-default" href="'+origin+routeUrl(route)+'">\n<meta property="og:type" content="website"><meta property="og:site_name" content="Annaelle"><meta property="og:title" content="'+escape(title)+'"><meta property="og:description" content="'+escape(metadata.description)+'"><meta property="og:url" content="'+url+'"><meta property="og:image" content="'+imageUrl+'"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="'+escape(title)+'"><meta name="twitter:description" content="'+escape(metadata.description)+'"><meta name="twitter:image" content="'+imageUrl+'"><script type="application/ld+json">'+JSON.stringify(schema(context,route,locale)).replace(/</g,'\\u003c')+'</script>';
 const nojs={ru:'Для записи напишите нам в Telegram. Интерактивные элементы доступны при включённом JavaScript.',en:'To book, contact us on Telegram. Interactive controls require JavaScript.',uz:'Yozilish uchun Telegramda bizga yozing. Interaktiv elementlar JavaScript yoqilganda ishlaydi.'}[locale];
 let html=template.replace('<html lang="ru">','<html lang="'+locale+'">').replace(/<title>.*?<\/title>/,'<title>'+escape(title)+'</title>').replace(/<meta name="description" content="[^"]*">/,'<meta name="description" content="'+escape(metadata.description)+'">').replace('</head>',meta+'\n</head>').replace('<div id="app"></div>','<div id="app" data-rendered="'+locale+':'+(route||'home')+'">'+body+'</div>').replace(/<noscript>.*?<\/noscript>/,'<noscript><p class="wrap">'+nojs+' <a href="https://t.me/annaellelaser">Telegram</a></p></noscript>').replace('Перейти к содержимому',dictionary['Перейти к содержимому']||'Перейти к содержимому');
 if(locale!=='ru')html=html.replaceAll('viaoda-cyrillic.woff2','viaoda-latin.woff2').replaceAll('manrope-cyrillic.woff2','manrope-latin.woff2');
 const directory=path.join(output,locale==='ru'?'':locale,route);await mkdir(directory,{recursive:true});await writeFile(path.join(directory,'index.html'),html);
 pages.push({route,locale,html});
}
await writeFile(path.join(output,'.nojekyll'),'');
// robots.txt belongs at the origin root, not the project path. Keep noindex in each test page.
// A noindex preview must not emit or submit an indexable production sitemap.
await writeFile(path.join(output,'404.html'),'<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Страница не найдена · Annaelle</title><h1>Страница не найдена</h1><a href="'+basePath+'/">Вернуться на главную Annaelle</a></html>');
for(const {route,locale,html} of pages){
 const document=parse(html);let h1=0;const ids=new Set(),links=[];visit(document,node=>{if(node.tagName==='h1')h1++;for(const attr of node.attrs||[]){if(attr.name==='id'){if(ids.has(attr.value))throw Error('Duplicate ID '+attr.value);ids.add(attr.value);}if(['src','href'].includes(attr.name))links.push(attr.value);}});
 if(h1!==1)throw Error('H1 count '+h1+': '+locale+'/'+route);
 for(const link of links){
  if(link.startsWith('#')&&!ids.has(link.slice(1)))throw Error('Missing anchor '+link);
  if(link.startsWith(basePath+'/')){const relative=link.slice(basePath.length+1).split(/[?#]/)[0];let file=path.join(output,relative);const stat=await lstat(file).catch(()=>null);if(!stat)throw Error('Missing target '+link);if(stat.isDirectory())file=path.join(file,'index.html');if(!(await lstat(file)).isFile())throw Error('Invalid target '+link);}
 }
}
const emitted=await readdir(output);if(emitted.some(name=>['qa','tools','.openai'].includes(name)))throw Error('Unexpected internal preview files');
console.log('Built '+pages.length+' content-complete static pages with metadata, translations and noindex; test mode enabled.');
