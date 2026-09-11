import { cp, lstat, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'preview-site');
const output = path.join(root, 'docs');
const basePath = '/mainsiteannaelle';
const routes = ['', 'services', 'prices', 'silk', 'about', 'specialists', 'reviews', 'faq', 'contacts', 'booking'];
const runtimeFiles = ['index.html', 'styles.css', 'config.js', 'original-data.js', 'catalog.js', 'data.js', 'translations.js', 'silk-content.js', 'silk-translations.js', 'silk-page.js', 'full-res.js', 'app.js'];

// Only this repository's generated docs directory may be replaced.
if (path.dirname(output) !== root || path.basename(output) !== 'docs') throw new Error('Invalid preview output');
const existing = await lstat(output).catch(error => { if (error.code !== 'ENOENT') throw error; });
if (existing?.isSymbolicLink()) throw new Error('Preview output must not be a symlink');
for (const file of runtimeFiles.filter(file => file.endsWith('.js'))) {
  execFileSync(process.execPath, ['--check', path.join(source, file)], { stdio: 'inherit' });
}
const config = await readFile(path.join(source, 'config.js'), 'utf8');
if (!/testMode:\s*true/.test(config)) throw new Error('GitHub preview must remain in test mode');
const app = await readFile(path.join(source, 'app.js'), 'utf8');
if (app.includes('result-photo-links')) throw new Error('Before/after fullscreen links must be absent');

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of runtimeFiles) await cp(path.join(source, file), path.join(output, file));
await cp(path.join(source, 'assets'), path.join(output, 'assets'), { recursive: true });

const html = (await readFile(path.join(source, 'index.html'), 'utf8'))
  .replace(/\b(href|src)="\/(?!\/)/g, `$1="${basePath}/`);
const css = (await readFile(path.join(source, 'styles.css'), 'utf8'))
  .replace(/url\((['"]?)\/(?!\/)/g, `url($1${basePath}/`);
await writeFile(path.join(output, 'styles.css'), css);
await writeFile(path.join(output, 'config.js'), `${config}\nwindow.ANNAELLE_CONFIG.basePath = ${JSON.stringify(basePath)};\n`);
for (const route of routes) {
  const directory = path.join(output, route);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), html);
}

// Preserve previously shared /en/... and /uz/... preview links.
for (const locale of ['en', 'uz']) {
  for (const route of routes) {
    const directory = path.join(output, locale, route);
    const target = `${basePath}/${route ? route + '/' : ''}`;
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, 'index.html'), `<!doctype html><html lang="${locale}"><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><title>Annaelle</title><p><a href="${target}?lang=${locale}">Annaelle</a></p><script>const query=new URLSearchParams(location.search);query.set('lang',${JSON.stringify(locale)});location.replace(${JSON.stringify(target)}+'?'+query.toString()+location.hash);</script></html>\n`);
  }
}
await writeFile(path.join(output, '.nojekyll'), '');
await writeFile(path.join(output, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
await writeFile(path.join(output, '404.html'), `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Страница не найдена · Annaelle</title><body><h1>Страница не найдена</h1><p><a href="${basePath}/">Вернуться на главную Annaelle</a></p></body></html>\n`);

// Validate every asset reference written into the HTML and stylesheet.
for (const match of (html + css).matchAll(/(?:src="|href="|url\(['"]?)(\/mainsiteannaelle\/[^\s"')]+)/g)) {
  const file = path.join(output, match[1].slice(basePath.length + 1));
  if (!(await lstat(file)).isFile()) throw new Error(`Missing preview asset: ${match[1]}`);
}
const emitted = await readdir(output);
if (emitted.includes('qa') || emitted.includes('tools') || emitted.includes('.openai')) throw new Error('Unexpected internal preview files');
console.log(`Built ${routes.length} routes and ${routes.length * 2} legacy locale redirects in docs/; test mode enabled.`);
