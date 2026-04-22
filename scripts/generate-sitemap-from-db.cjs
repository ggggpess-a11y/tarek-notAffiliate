#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const mongoose = require('mongoose');

const { connectDb } = require('../backend/src/db');
const { config } = require('../backend/src/config');
const { Post } = require('../backend/src/models/Post');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_OUT = path.join(ROOT, 'public', 'sitemap.xml');
const DIST_OUT = path.join(ROOT, 'dist', 'sitemap.xml');

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildXml(base, posts) {
  const today = new Date().toISOString().slice(0, 10);
  const staticUrls = [
    { loc: `${base}/`, lastmod: today, changefreq: 'weekly', priority: '1.0' },
    { loc: `${base}/blog`, lastmod: today, changefreq: 'daily', priority: '0.9' },
  ];
  const postUrls = posts.map((p) => ({
    loc: `${base}/blog/${encodeURIComponent(p.slug)}`,
    lastmod: new Date(p.updatedAt || p.createdAt || Date.now()).toISOString().slice(0, 10),
    changefreq: 'weekly',
    priority: '0.8',
  }));
  const urls = [...staticUrls, ...postUrls];

  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls
      .map(
        (u) =>
          `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
      )
      .join('\n') +
    '\n</urlset>\n'
  );
}

function writeSitemap(filePath, xml) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, xml, 'utf8');
}

async function main() {
  const base = (config.webOrigin || '').replace(/\/$/, '');
  if (!base) {
    console.warn('[sitemap:db] WEB_ORIGIN missing, skipping');
    return;
  }

  if (!config.mongoUri) {
    console.warn('[sitemap:db] MONGO_URI missing, skipping');
    return;
  }

  try {
    await connectDb();
    const posts = await Post.find({ published: true }).select('slug updatedAt createdAt').sort({ updatedAt: -1 }).lean();
    const xml = buildXml(base, posts);

    writeSitemap(PUBLIC_OUT, xml);
    if (fs.existsSync(path.dirname(DIST_OUT))) {
      writeSitemap(DIST_OUT, xml);
    }

    console.log(`[sitemap:db] wrote ${2 + posts.length} URLs`);
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((err) => {
  console.warn('[sitemap:db] failed:', err instanceof Error ? err.message : err);
  process.exitCode = 0;
});
