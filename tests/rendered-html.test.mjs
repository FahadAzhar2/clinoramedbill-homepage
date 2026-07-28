import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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
}

test("server-renders the ClinoraMedBill homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>ClinoraMedBill \| Medical Billing &amp; Revenue Cycle Management<\/title>/i,
  );
  assert.match(html, /Medical billing, managed with clarity/i);
  assert.match(html, /Free billing audit/i);
  assert.match(html, /From visit to payment, nothing gets lost/i);
  assert.match(html, /Live revenue operations/i);
  assert.match(html, /Operating benchmarks, made visible/i);
  assert.match(html, /Specialties we serve/i);
  assert.match(html, /Security &amp; Compliance/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("keeps core accessibility and project metadata in source", async () => {
  const [page, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /className="skip-link"/);
  assert.match(page, /aria-label="Primary navigation"/);
  assert.match(page, /aria-live="polite"/);
  assert.match(page, /<label>/);
  assert.match(page, /data-count-to="99\.9"/);
  assert.match(page, /data-count-to="98\.7"/);
  assert.match(page, /aria-pressed=\{isActive\}/);
  assert.match(page, /IntersectionObserver/);
  assert.match(layout, /ClinoraMedBill \| Medical Billing & Revenue Cycle Management/);
  assert.match(layout, /openGraph:/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(packageJson, /"lint":\s*"eslint/);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview/);
});
