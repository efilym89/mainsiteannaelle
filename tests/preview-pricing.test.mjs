import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
import test from 'node:test';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const ctx={window:{}};vm.createContext(ctx);
for(const file of ['catalog.js','full-res.js'])vm.runInContext(readFileSync(path.join(root,'preview-site',file),'utf8'),ctx);
const catalog=ctx.window.CATALOG;
const amount=v=>Number(String(v).replace(/\s/g,''));
const source=JSON.parse(readFileSync(path.join(root,'reference/prices-2026-10-05.json'),'utf8'));
test('First-visit offers match the three supplied promotional cards',()=>{
 assert.deepEqual(Array.from(catalog.offers,x=>[x.title,amount(x.price)]),source.firstVisitOffers.map(x=>[x.title,x.price]));
});
test('All 19 individual areas retain their published category and price',()=>{
 assert.equal(catalog.zoneGroups.flatMap(g=>g.zones).length,19);
 assert.deepEqual(Array.from(catalog.zoneGroups,g=>({code:g.code,price:amount(g.price),zones:Array.from(g.zones)})),source.singleZoneGroups.map(({code,price,zones})=>({code,price,zones})));
});
test('Every combination and all 20 package totals match the supplied price list',()=>{
 source.combos.forEach((combo,i)=>{
  assert.equal(amount(catalog.singles[i].price),combo.single);
  for(const n of [3,5,7,9]){
   const card=catalog.packages[n].items[i],expected=combo.packages[n];
   assert.equal(amount(card.price),expected.total,`${combo.code}, ${n} treatments`);
   assert.equal(amount(card.perVisit),expected.perVisitPrinted);
   assert.equal(amount(card.perVisit),Math.round(expected.total/n));
   assert.equal(amount(card.oldPrice),combo.single*n);
   assert.equal(card.saving,combo.single*n-expected.total);
   assert.equal(card.approximate,expected.total%n!==0);
  }
 });
});
test('Photo replacements have both display assets and original files',()=>{
 for(const [file,original] of Object.entries(ctx.window.PHOTO_ORIGINALS)){
  assert.ok(existsSync(path.join(root,'preview-site/assets',file)),file);
  assert.ok(existsSync(path.join(root,'preview-site/assets',original)),original);
 }
 assert.equal(new Set(catalog.offers.flatMap(o=>[o.image,o.cardImage])).size,6);
});
