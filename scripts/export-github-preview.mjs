import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.resolve(process.argv[2] ?? path.join(projectRoot, "dist"));
const outputDir = path.resolve(process.argv[3] ?? path.join(projectRoot, "docs"));
const basePath = `/${(process.env.GITHUB_PAGES_BASE_PATH ?? "mainsiteannaelle")
  .replace(/^\/+|\/+$/g, "")}`;

const routes = [
  "/",
  "/services",
  "/prices",
  "/silk",
  "/about",
  "/specialists",
  "/reviews",
  "/faq",
  "/contacts",
  "/booking",
];

const previewCss = `
.github-preview-banner {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  min-height: 34px;
  align-items: center;
  justify-content: center;
  padding: 6px 16px;
  background: #231f20;
  color: #fff;
  font: 600 12px/1.3 Manrope, Arial, sans-serif;
  letter-spacing: .02em;
  text-align: center;
}

body { padding-top: 34px; }
.site-header { top: 34px; }

.github-preview-note {
  margin: 0 0 18px;
  padding: 12px 16px;
  border: 1px solid rgba(135, 81, 96, .25);
  border-radius: 14px;
  background: #f3e4ea;
  color: #643c48;
  font-size: 13px;
}

.price-tabs button:disabled {
  cursor: not-allowed;
  opacity: 1;
}

@media (max-width: 780px) {
  .github-preview-banner { min-height: 42px; font-size: 11px; }
  body { padding-top: 42px; }
  .site-header { top: 42px; }
}
`;

const previewJs = `(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-button');
  const desktopNav = document.querySelector('.desktop-nav');

  if (header && menuButton && desktopNav && !document.getElementById('mobile-navigation')) {
    const mobileNav = document.createElement('nav');
    mobileNav.className = 'mobile-nav';
    mobileNav.id = 'mobile-navigation';
    mobileNav.setAttribute('aria-label', 'Мобильная навигация');

    desktopNav.querySelectorAll('a').forEach((link) => {
      mobileNav.append(link.cloneNode(true));
    });

    const bookingLink = document.querySelector('.desktop-booking');
    if (bookingLink) {
      const mobileBooking = bookingLink.cloneNode(true);
      mobileBooking.className = 'button';
      mobileNav.append(mobileBooking);
    }

    header.append(mobileNav);

    const setOpen = (open) => {
      menuButton.classList.toggle('is-open', open);
      mobileNav.classList.toggle('is-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      document.body.toggleAttribute('data-navigation-open', open);
    };

    menuButton.addEventListener('click', () => {
      setOpen(menuButton.getAttribute('aria-expanded') !== 'true');
    });
    mobileNav.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.focus();
      }
    });
  }

  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    const note = document.createElement('p');
    note.className = 'github-preview-note';
    note.textContent = 'Это визуальная тестовая версия. Заявка не будет отправлена.';
    bookingForm.prepend(note);
    bookingForm.addEventListener('submit', (event) => event.preventDefault());
    const submitButton = bookingForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Отправка отключена в preview';
    }
  }

  const tabList = document.querySelector('.price-tabs');
  if (tabList) {
    tabList.querySelectorAll('button').forEach((button) => {
      button.disabled = true;
      button.setAttribute('title', 'Интерактивное переключение доступно в рабочей версии');
    });
    const note = document.createElement('p');
    note.className = 'github-preview-note';
    note.textContent = 'В GitHub preview показан базовый прайс. Интерактивные вкладки доступны в рабочей версии.';
    tabList.after(note);
  }
})();
`;

function stripApplicationRuntime(html) {
  return html
    .replace(
      /<script\b(?![^>]*\btype=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>/gi,
      "",
    )
    .replace(/<link\b[^>]*\brel=["']modulepreload["'][^>]*\/?>(?:\s*)/gi, "");
}

function rewriteRootPaths(html) {
  let rewritten = html.replace(
    /\b(href|src|action)=(["'])\/(?!\/)/gi,
    `$1=$2${basePath}/`,
  );

  rewritten = rewritten.replace(
    /\b(srcset|imagesrcset)=(["'])([\s\S]*?)\2/gi,
    (attribute, name, quote, value) => {
      const nextValue = value.replace(/(^|,\s*)\/(?!\/)/g, `$1${basePath}/`);
      return `${name}=${quote}${nextValue}${quote}`;
    },
  );

  return rewritten;
}

function prepareHtml(html) {
  let prepared = rewriteRootPaths(stripApplicationRuntime(html));
  prepared = prepared.replace(
    /<html\b([^>]*)>/i,
    '<html$1 data-github-preview="true">',
  );
  prepared = prepared.replace(
    /<\/head>/i,
    `<meta name="robots" content="noindex,nofollow,noarchive"><link rel="stylesheet" href="${basePath}/preview.css"></head>`,
  );
  prepared = prepared.replace(
    /<body\b([^>]*)>/i,
    '<body$1><aside class="github-preview-banner">Тестовая версия для команды · отправка заявок отключена</aside>',
  );
  prepared = prepared.replace(
    /<\/body>/i,
    `<script src="${basePath}/preview.js"></script></body>`,
  );
  return prepared;
}

async function rewriteCssAssets(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await rewriteCssAssets(entryPath);
      continue;
    }
    if (!entry.name.endsWith(".css")) continue;

    const css = await readFile(entryPath, "utf8");
    const rewritten = css.replace(
      /url\((['"]?)\/(?!\/)/gi,
      `url($1${basePath}/`,
    );
    await writeFile(entryPath, rewritten);
  }
}

async function removeApplicationAssets(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await removeApplicationAssets(entryPath);
      continue;
    }
    if (entry.name.endsWith(".js") || entry.name.endsWith(".map")) {
      await rm(entryPath, { force: true });
    }
  }
}

async function render(worker, route) {
  const response = await worker.fetch(
    new Request(`https://preview.local${route}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  if (response.status !== 200 && response.status !== 404) {
    throw new Error(`${route} returned ${response.status}`);
  }

  return prepareHtml(await response.text());
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(path.join(distDir, "client"), outputDir, { recursive: true });

const workerUrl = pathToFileURL(path.join(distDir, "server", "index.js"));
workerUrl.searchParams.set("github-preview", `${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

for (const route of routes) {
  const html = await render(worker, route);
  const routeDirectory =
    route === "/" ? outputDir : path.join(outputDir, route.slice(1));
  await mkdir(routeDirectory, { recursive: true });
  await writeFile(path.join(routeDirectory, "index.html"), html);
}

const notFoundHtml = await render(worker, "/page-that-does-not-exist");
await writeFile(path.join(outputDir, "404.html"), notFoundHtml);
await writeFile(path.join(outputDir, ".nojekyll"), "");
await writeFile(path.join(outputDir, "preview.css"), previewCss.trimStart());
await writeFile(path.join(outputDir, "preview.js"), previewJs.trimStart());
await removeApplicationAssets(path.join(outputDir, "assets"));
await rewriteCssAssets(path.join(outputDir, "assets"));

for (const route of routes) {
  const htmlPath =
    route === "/"
      ? path.join(outputDir, "index.html")
      : path.join(outputDir, route.slice(1), "index.html");
  const html = await readFile(htmlPath, "utf8");

  if (html.includes("/_vinext/image") || html.includes('rel="modulepreload"')) {
    throw new Error(`${route} still contains application runtime URLs`);
  }

  for (const match of html.matchAll(
    /\b(?:href|src|action)=["'](\/(?!\/)[^"']*)/gi,
  )) {
    if (match[1] !== basePath && !match[1].startsWith(`${basePath}/`)) {
      throw new Error(`${route} contains an unprefixed path: ${match[1]}`);
    }
  }
}

console.log(`GitHub Pages preview exported to ${outputDir}`);
