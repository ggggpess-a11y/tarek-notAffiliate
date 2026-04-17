#!/usr/bin/env node
/**
 * يولّد public/sitemap.xml من WEB_ORIGIN و(اختياري) قائمة المقالات من الـ API.
 * استخدمه قبل النشر: WEB_ORIGIN=https://tarek-affiliate.com node scripts/generate-sitemap.mjs
 * أو مع API محلي: WEB_ORIGIN=http://localhost:4000 node scripts/generate-sitemap.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'sitemap.xml');

const WEB_ORIGIN = (process.env.WEB_ORIGIN || 'https://tarek-affiliate.com').replace(/\/$/, '');
/** عنوان كامل لـ GET /api/posts (مثال: https://tarek-affiliate.com أو http://localhost:4000) */
const API_ORIGIN = (process.env.SITEMAP_API_ORIGIN || WEB_ORIGIN).replace(/\/$/, '');

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function fetchPublishedPosts() {
  const url = `${API_ORIGIN}/api/posts`;
  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) {
      console.warn(`[sitemap] ${url} → HTTP ${res.status}, using static URLs only`);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data.posts) ? data.posts : [];
  } catch (e) {
    console.warn('[sitemap] تعذّر جلب المقالات:', e instanceof Error ? e.message : e);
    return [];
  }
}

function buildXml(posts) {
  const today = new Date().toISOString().slice(0, 10);
  const staticUrls = [
    { loc: `${WEB_ORIGIN}/`, lastmod: today, changefreq: 'weekly', priority: '1.0' },
    { loc: `${WEB_ORIGIN}/blog`, lastmod: today, changefreq: 'daily', priority: '0.9' },
  ];
  const postUrls = posts.map((p) => ({
    loc: `${WEB_ORIGIN}/blog/${encodeURIComponent(p.slug)}`,
    lastmod: new Date(p.updatedAt || p.createdAt || Date.now()).toISOString().slice(0, 10),
    changefreq: 'weekly',
    priority: '0.8',
  }));

  const all = [...staticUrls, ...postUrls];
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    all
      .map(
        (u) =>
          `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
      )
      .join('\n') +
    '\n</urlset>';
  return body;
}

async function main() {
  const posts = await fetchPublishedPosts();
  const xml = buildXml(posts);
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, xml, 'utf8');
  console.log(`[sitemap] wrote ${OUT} (${2 + posts.length} URLs)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
