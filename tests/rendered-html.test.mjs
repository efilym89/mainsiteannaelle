import assert from "node:assert/strict";
import test from "node:test";

const siteUrl = "https://annaelle-studio.efilym.chatgpt.site";
const rootRoutes = [
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
const routes = [
  ...rootRoutes,
  ...["uz", "en"].flatMap((locale) =>
    rootRoutes.map((route) => `/${locale}${route === "/" ? "" : route}`),
  ),
];
const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker;
}

function environment() {
  return {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  };
}

function context() {
  return {
    waitUntil() {},
    passThroughOnException() {},
  };
}

test("renders every public route with production metadata and one H1", async () => {
  const worker = await loadWorker();

  for (const route of routes) {
    const response = await worker.fetch(
      new Request(`http://localhost${route}`, {
        headers: { accept: "text/html" },
      }),
      environment(),
      context(),
    );

    assert.equal(response.status, 200, route);
    assert.match(
      response.headers.get("content-type") ?? "",
      /^text\/html\b/i,
      route,
    );
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");

    const html = await response.text();
    const canonical = route === "/" ? `${siteUrl}/` : `${siteUrl}${route}`;

    assert.doesNotMatch(html, developmentPreviewMeta, route);
    const expectedLang = route === "/uz" || route.startsWith("/uz/")
      ? "uz-Latn"
      : route === "/en" || route.startsWith("/en/")
        ? "en"
        : "ru";
    assert.match(
      html,
      new RegExp(`<html\\b[^>]*\\blang=["']${expectedLang}["']`, "i"),
      route,
    );
    assert.match(html, /<meta\b[^>]*\bname=["']viewport["']/i, route);
    assert.match(
      html,
      new RegExp(`<link\\b[^>]*\\brel=["']canonical["'][^>]*\\bhref=["']${canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`, "i"),
      route,
    );
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, route);
    assert.match(
      html,
      /<meta\b[^>]*\bproperty=["']og:title["'][^>]*\bcontent=["'][^"']+["']/i,
      route,
    );
    assert.match(
      html,
      /<meta\b[^>]*\bname=["']twitter:title["'][^>]*\bcontent=["'][^"']+["']/i,
      route,
    );

    if (expectedLang !== "ru") {
      const socialTitles = [
        ...html.matchAll(
          /<meta\b[^>]*(?:property=["']og:title["']|name=["']twitter:title["'])[^>]*\bcontent=["']([^"']+)["'][^>]*>/gi,
        ),
      ].map((match) => match[1]);
      assert.equal(socialTitles.length, 2, route);
      assert.doesNotMatch(socialTitles.join(" "), /[А-Яа-яЁё]/, route);
    }

    if (route === "/" || route === "/uz" || route === "/en") {
      assert.match(html, /src=["']\/images\/home-hero\.webp["']/i);
      assert.doesNotMatch(html, /\/_vinext\/image\?/i);
    }

    if (route === "/uz") {
      assert.match(html, /Bosh sahifa/i);
      assert.match(html, /href=["']\/en["']/i);
    }

    if (route === "/en") {
      assert.match(html, />Home</i);
      assert.match(html, /href=["']\/uz["']/i);
    }
  }
});

test("renders a branded 404 page", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/page-that-does-not-exist", {
      headers: { accept: "text/html" },
    }),
    environment(),
    context(),
  );

  assert.equal(response.status, 404);
  assert.match(await response.text(), /Такой страницы здесь нет/);
});
