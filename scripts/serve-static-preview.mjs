import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../docs');
const base = '/mainsiteannaelle';
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.json':'application/json; charset=utf-8'};
http.createServer((req,res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname === '/' || url.pathname === base) { res.writeHead(302,{Location:base+'/'});res.end();return; }
  if (!url.pathname.startsWith(base+'/')) {res.writeHead(404);res.end();return;}
  let route;try{route=decodeURIComponent(url.pathname.slice(base.length+1));}catch{res.writeHead(400);res.end();return;}
  let file = path.resolve(root,route);
  const relative=path.relative(root,file);
  if(relative.startsWith('..')||path.isAbsolute(relative)){res.writeHead(404);res.end();return;}
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  if(!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
  res.setHeader('Cache-Control','no-store');
  res.setHeader('X-Robots-Tag','noindex, nofollow');
  fs.createReadStream(file).pipe(res);
}).listen(4190,'127.0.0.1',()=>console.log('GitHub Pages build: http://127.0.0.1:4190/mainsiteannaelle/'));
