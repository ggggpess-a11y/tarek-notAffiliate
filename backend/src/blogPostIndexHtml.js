const fs = require('node:fs');
const path = require('node:path');
const { Post } = require('./models/Post');
const { config } = require('./config');
const { setInlineHtmlHeaders } = require('./utils/htmlHeaders');

const SITE_NAME = 'MELBET — برنامج الشركاء';

function siteOriginFromConfig() {
  return (config.webOrigin || '').replace(/\/$/, '');
}

function inferOriginFromRequest(req) {
  const xfProto = req.get('x-forwarded-proto');
  const host = req.get('x-forwarded-host') || req.get('host');
  if (!host) return '';
  const proto = (xfProto || 'https').split(',')[0].trim();
  const h = host.split(',')[0].trim();
  return `${proto}://${h}`;
}

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtmlTitle(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function toAbsoluteUrl(webOrigin, pathOrUrl) {
  const u = (pathOrUrl || '').trim();
  if (/^https?:\/\//i.test(u)) return u;
  const p = u.startsWith('/') ? u : `/${u}`;
  return `${webOrigin}${p}`;
}

function toIso(d) {
  if (!d) return undefined;
  if (d instanceof Date) return d.toISOString();
  const t = new Date(d);
  return Number.isNaN(t.getTime()) ? undefined : t.toISOString();
}

function injectBlogPostIndexHtml(html, post, webOrigin) {
  const canonical = `${webOrigin}/blog/${encodeURIComponent(post.slug)}`;
  const pageTitle = `${post.title} | ${SITE_NAME}`;
  const description = post.excerpt;
  const ogTitle = post.title;
  const imageAbs = toAbsoluteUrl(
    webOrigin,
    post.imageUrl || '/assets/images/partner-growth-dashboard.webp'
  );
  const published = toIso(post.createdAt);
  const modified = toIso(post.updatedAt) || published;

  let out = html;
  out = out.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${escapeAttr(description)}"`);
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtmlTitle(pageTitle)}</title>`);
  out = out.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${escapeAttr(canonical)}"`);
  out = out.replace(/<link rel="alternate" hreflang="ar" href="[^"]*"/, `<link rel="alternate" hreflang="ar" href="${escapeAttr(canonical)}"`);
  out = out.replace(/<meta property="og:type" content="[^"]*"/, `<meta property="og:type" content="article"`);
  out = out.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${escapeAttr(canonical)}"`);
  out = out.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${escapeAttr(ogTitle)}"`);
  out = out.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${escapeAttr(description)}"`);
  out = out.replace(/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${escapeAttr(imageAbs)}"`);
  out = out.replace(/<meta property="og:image:secure_url" content="[^"]*"/, `<meta property="og:image:secure_url" content="${escapeAttr(imageAbs)}"`);
  out = out.replace(/<meta property="og:image:alt" content="[^"]*"/, `<meta property="og:image:alt" content="${escapeAttr(post.title)}"`);
  out = out.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${escapeAttr(ogTitle)}"`);
  out = out.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${escapeAttr(description)}"`);
  out = out.replace(/<meta name="twitter:image" content="[^"]*"/, `<meta name="twitter:image" content="${escapeAttr(imageAbs)}"`);

  out = out.replace(/\n  <meta property="og:image:type" content="[^"]*" \/>/g, '');
  out = out.replace(/\n  <meta property="og:image:width" content="[^"]*" \/>/g, '');
  out = out.replace(/\n  <meta property="og:image:height" content="[^"]*" \/>/g, '');

  if (published) {
    out = out.replace(
      /<meta property="og:locale" content="ar_SA" \/>/,
      `<meta property="og:locale" content="ar_SA" />\n  <meta property="article:published_time" content="${escapeAttr(published)}" />\n  <meta property="article:modified_time" content="${escapeAttr(modified)}" />`
    );
  }

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [imageAbs],
    datePublished: published || undefined,
    dateModified: modified || undefined,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'MELBET',
      url: webOrigin || undefined,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    inLanguage: 'ar',
  };

  out = out.replace(
    /<script type="application\/ld\+json">\s*[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n${JSON.stringify(ld)}\n  </script>`
  );

  return out;
}

/**
 * إنتاج فقط: يُرجع index.html مع وسوم Open Graph من الخادم حتى تعمل معاينات
 * فيسبوك/واتساب/لينكدإن (لا تنفّذ JavaScript).
 */
async function sendBlogPostIndexHtml(req, res, next) {
  const slug = req.params.slug;
  if (!slug) return next();

  const distPath = path.resolve(process.cwd(), 'dist');
  const indexPath = path.join(distPath, 'index.html');
  if (!fs.existsSync(indexPath)) return next();

  try {
    const post = await Post.findOne({ slug, published: true }).lean();
    if (!post) return next();

    const webOrigin = siteOriginFromConfig() || inferOriginFromRequest(req);
    if (!webOrigin) {
      return next();
    }

    const raw = fs.readFileSync(indexPath, 'utf8');
    const html = injectBlogPostIndexHtml(raw, post, webOrigin);
    setInlineHtmlHeaders(res);
    res.send(html);
  } catch (err) {
    next(err);
  }
}

module.exports = { sendBlogPostIndexHtml };
