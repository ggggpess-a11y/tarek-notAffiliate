const { Post } = require('../models/Post');
const { config } = require('../config');

function siteOrigin() {
  return (config.webOrigin || '').replace(/\/$/, '');
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** robots.txt و sitemap.xml ديناميكيان — يجب ضبط WEB_ORIGIN في الإنتاج */
function registerSeoRoutes(app) {
  app.get('/robots.txt', (_req, res) => {
    res.set('Cache-Control', 'public, max-age=3600');
    const base = siteOrigin();
    const lines = [
      'User-agent: *',
      'Allow: /',
      'Disallow: /admin.html',
      'Disallow: /api/',
      '',
      base ? `Sitemap: ${base}/sitemap.xml` : 'Sitemap: /sitemap.xml',
      '',
    ];
    res.type('text/plain; charset=utf-8');
    res.send(lines.join('\n'));
  });

  app.get('/sitemap.xml', async (_req, res) => {
    res.set('Cache-Control', 'public, max-age=3600');
    const base = siteOrigin();
    if (!base) {
      res.type('application/xml; charset=utf-8');
      return res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><error>WEB_ORIGIN missing</error>');
    }
    try {
      const posts = await Post.find({ published: true })
        .select('slug updatedAt')
        .sort({ updatedAt: -1 })
        .lean();

      const today = new Date().toISOString().slice(0, 10);
      const staticUrls = [
        { loc: `${base}/`, changefreq: 'weekly', priority: '1.0', lastmod: today },
        { loc: `${base}/blog`, changefreq: 'daily', priority: '0.9', lastmod: today },
      ];
      const postUrls = posts.map((p) => ({
        loc: `${base}/blog/${encodeURIComponent(p.slug)}`,
        changefreq: 'weekly',
        priority: '0.8',
        lastmod: new Date(p.updatedAt).toISOString().slice(0, 10),
      }));

      const body =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        [...staticUrls, ...postUrls]
          .map(
            (u) =>
              `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
          )
          .join('\n') +
        '\n</urlset>';

      res.type('application/xml; charset=utf-8');
      res.send(body);
    } catch (e) {
      console.error(e);
      res.status(500).type('application/xml; charset=utf-8');
      res.send('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"/>');
    }
  });
}

module.exports = { registerSeoRoutes };
