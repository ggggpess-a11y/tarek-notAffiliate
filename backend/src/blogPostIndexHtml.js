const fs = require('node:fs');
const path = require('node:path');
const { Post } = require('./models/Post');
const { config } = require('./config');
const { setInlineHtmlHeaders } = require('./utils/htmlHeaders');
const { articleSnippet, stripHtml } = require('./utils/articleSnippet');
const { rtlSeoText } = require('./utils/rtlSeoText');

const SITE_NAME = rtlSeoText('MELBET — برنامج الشركاء');

function siteOriginFromConfig() {
  return (config.webOrigin || '').replace(/\/$/, '');
}

function inferOriginFromRequest(req) {
  const xfProto = req.get('x-forwarded-proto');
  const host = req.get('x-forwarded-host') || req.get('host');
  if (!host) return '';
  const proto = (xfProto || req.protocol || 'https').split(',')[0].trim();
  const h = String(host).split(',')[0].trim();
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

/** نص آمن للعرض في HTML الأول (بدون وسوم) ليملأ #root أمام الزاحف */
function plainPreview(post, maxLen = 1200) {
  const plain = stripHtml(post.content || '') || (post.excerpt || '').trim() || post.title || '';
  if (plain.length <= maxLen) return plain;
  return `${plain.slice(0, Math.max(0, maxLen - 1))}…`;
}

function injectRootHtml(html, innerHtml) {
  return html.replace(/<div id="root"><\/div>/, `<div id="root">${innerHtml}</div>`);
}

function setRobotsMeta(html, content) {
  if (/<meta name="robots" content="[^"]*"/.test(html)) {
    return html.replace(/<meta name="robots" content="[^"]*"/, `<meta name="robots" content="${escapeAttr(content)}"`);
  }
  return html.replace(/<head>/i, `<head>\n  <meta name="robots" content="${escapeAttr(content)}" />`);
}

/**
 * يحقن وسوم المقال في index.html — يجب أن تطابق السطور في ../../../index.html
 */
function injectBlogPostIndexHtml(html, post, webOrigin) {
  const canonical = `${webOrigin}/blog/${encodeURIComponent(post.slug)}`;
  const pageTitle = rtlSeoText(`${post.title} | MELBET — برنامج الشركاء`);
  const description = articleSnippet(post);
  const ogTitle = rtlSeoText(post.title);
  const imageAbs = toAbsoluteUrl(
    webOrigin,
    post.imageUrl || '/assets/images/partner-growth-dashboard.webp'
  );
  const published = toIso(post.createdAt);
  const modified = toIso(post.updatedAt) || published;
  const bodyPreview = escapeHtmlTitle(plainPreview(post));

  let out = html;

  const reps = [
    [/<meta name="description" content="[^"]*"/, `<meta name="description" content="${escapeAttr(description)}"`],
    [/<title>[^<]*<\/title>/, `<title dir="rtl">${escapeHtmlTitle(pageTitle)}</title>`],
    [/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${escapeAttr(canonical)}"`],
    [/<link rel="alternate" hreflang="ar" href="[^"]*"/, `<link rel="alternate" hreflang="ar" href="${escapeAttr(canonical)}"`],
    [/<meta property="og:type" content="[^"]*"/, `<meta property="og:type" content="article"`],
    [/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${escapeAttr(canonical)}"`],
    [/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${escapeAttr(ogTitle)}"`],
    [/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${escapeAttr(description)}"`],
    [/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${escapeAttr(imageAbs)}"`],
    [/<meta property="og:image:secure_url" content="[^"]*"/, `<meta property="og:image:secure_url" content="${escapeAttr(imageAbs)}"`],
    [/<meta property="og:image:alt" content="[^"]*"/, `<meta property="og:image:alt" content="${escapeAttr(post.title)}"`],
    [/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${escapeAttr(ogTitle)}"`],
    [/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${escapeAttr(description)}"`],
    [/<meta name="twitter:image" content="[^"]*"/, `<meta name="twitter:image" content="${escapeAttr(imageAbs)}"`],
  ];

  for (const [pattern, replacement] of reps) {
    out = out.replace(pattern, replacement);
  }

  out = setRobotsMeta(out, 'index,follow');

  out = out.replace(/\n  <meta property="og:image:type" content="[^"]*" \/>/g, '');
  out = out.replace(/\n  <meta property="og:image:width" content="[^"]*" \/>/g, '');
  out = out.replace(/\n  <meta property="og:image:height" content="[^"]*" \/>/g, '');

  let articleTimes = '';
  if (published) {
    articleTimes = `\n  <meta property="article:published_time" content="${escapeAttr(published)}" />\n  <meta property="article:modified_time" content="${escapeAttr(modified)}" />`;
  }
  out = out.replace(
    /<meta property="og:locale" content="ar_SA" \/>/,
    `<meta property="og:locale" content="ar_SA" />${articleTimes}`
  );

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: rtlSeoText(post.title),
    description,
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

  const ldJson = JSON.stringify(ld).replace(/</g, '\\u003c');
  out = out.replace(
    /<script type="application\/ld\+json">\s*[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n  ${ldJson}\n  </script>`
  );

  /** محتوى أولي في #root حتى لا يرى الزاحف صفحة فارغة قبل تنفيذ JS */
  out = injectRootHtml(
    out,
    `<article>` +
      `<h1>${escapeHtmlTitle(post.title)}</h1>` +
      `<p>${escapeHtmlTitle(description)}</p>` +
      `<div>${bodyPreview}</div>` +
      `<p><a href="${escapeAttr(`${webOrigin}/blog`)}">العودة إلى المدونة</a></p>` +
      `</article>`
  );

  return out;
}

const BLOG_INDEX_TITLE = rtlSeoText(`المدونة | MELBET — برنامج الشركاء`);
const BLOG_INDEX_DESCRIPTION = rtlSeoText(
  'مقالات ونصائح لشركاء MELBET: تسويق بالعمولة، زيادة الإحالات، وأفضل الممارسات لبرنامج الشركاء.'
);

/**
 * قائمة المقالات `/blog` — يجب أن تطابق applyBlogIndexDocumentSeo في الواجهة حتى لا يبقى
 * canonical في HTML الأول يشير إلى `/` فيُعتبر المسار نسخة بديلة في Search Console.
 */
function injectBlogIndexHtml(html, webOrigin, posts) {
  const canonical = `${webOrigin}/blog`;
  const ogTitle = BLOG_INDEX_TITLE;
  const imageAbs = toAbsoluteUrl(webOrigin, '/assets/branding/og-share-1200x630.png');
  const listItems = (posts || [])
    .map((p) => {
      const href = `${webOrigin}/blog/${encodeURIComponent(p.slug)}`;
      return `<li><a href="${escapeAttr(href)}">${escapeHtmlTitle(p.title)}</a></li>`;
    })
    .join('');

  let out = html;

  const reps = [
    [/<meta name="description" content="[^"]*"/, `<meta name="description" content="${escapeAttr(BLOG_INDEX_DESCRIPTION)}"`],
    [/<title>[^<]*<\/title>/, `<title dir="rtl">${escapeHtmlTitle(BLOG_INDEX_TITLE)}</title>`],
    [/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${escapeAttr(canonical)}"`],
    [/<link rel="alternate" hreflang="ar" href="[^"]*"/, `<link rel="alternate" hreflang="ar" href="${escapeAttr(canonical)}"`],
    [/<meta property="og:type" content="[^"]*"/, `<meta property="og:type" content="website"`],
    [/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${escapeAttr(canonical)}"`],
    [/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${escapeAttr(ogTitle)}"`],
    [/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${escapeAttr(BLOG_INDEX_DESCRIPTION)}"`],
    [/<meta property="og:image" content="[^"]*"/, `<meta property="og:image" content="${escapeAttr(imageAbs)}"`],
    [/<meta property="og:image:secure_url" content="[^"]*"/, `<meta property="og:image:secure_url" content="${escapeAttr(imageAbs)}"`],
    [/<meta property="og:image:alt" content="[^"]*"/, `<meta property="og:image:alt" content="${escapeAttr('MELBET — نظام التسويق بالعمولة، برنامج الشركاء')}"`],
    [/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${escapeAttr(ogTitle)}"`],
    [/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${escapeAttr(BLOG_INDEX_DESCRIPTION)}"`],
    [/<meta name="twitter:image" content="[^"]*"/, `<meta name="twitter:image" content="${escapeAttr(imageAbs)}"`],
  ];

  for (const [pattern, replacement] of reps) {
    out = out.replace(pattern, replacement);
  }

  out = setRobotsMeta(out, 'index,follow');

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: BLOG_INDEX_TITLE,
    description: BLOG_INDEX_DESCRIPTION,
    url: canonical,
    inLanguage: 'ar',
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${webOrigin}/`,
    },
  };

  const ldJson = JSON.stringify(ld).replace(/</g, '\\u003c');
  out = out.replace(
    /<script type="application\/ld\+json">\s*[\s\S]*?<\/script>/,
    `<script type="application/ld+json">\n  ${ldJson}\n  </script>`
  );

  out = injectRootHtml(
    out,
    `<main>` +
      `<h1>${escapeHtmlTitle(BLOG_INDEX_TITLE)}</h1>` +
      `<p>${escapeHtmlTitle(BLOG_INDEX_DESCRIPTION)}</p>` +
      (listItems ? `<ul>${listItems}</ul>` : '') +
      `</main>`
  );

  return out;
}

function injectBlogNotFoundHtml(html, webOrigin) {
  const canonical = `${webOrigin}/blog`;
  const title = rtlSeoText(`المقال غير موجود | MELBET — برنامج الشركاء`);
  const description = rtlSeoText('قد يكون تم حذف المقال أو تغيير رابطه.');

  let out = html;
  out = out.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${escapeAttr(description)}"`);
  out = out.replace(/<title>[^<]*<\/title>/, `<title dir="rtl">${escapeHtmlTitle(title)}</title>`);
  out = out.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${escapeAttr(canonical)}"`);
  out = out.replace(/<link rel="alternate" hreflang="ar" href="[^"]*"/, `<link rel="alternate" hreflang="ar" href="${escapeAttr(canonical)}"`);
  out = out.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${escapeAttr(canonical)}"`);
  out = out.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${escapeAttr(title)}"`);
  out = out.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${escapeAttr(description)}"`);
  out = setRobotsMeta(out, 'noindex,follow');
  out = injectRootHtml(
    out,
    `<main>` +
      `<h1>المقال غير موجود</h1>` +
      `<p>${escapeHtmlTitle(description)}</p>` +
      `<p><a href="${escapeAttr(canonical)}">العودة إلى المدونة</a></p>` +
      `</main>`
  );
  return out;
}

/**
 * إنتاج: index.html مع وسوم قائمة المدونة (canonical و OG) قبل تنفيذ JS.
 */
async function sendBlogIndexHtml(req, res, next) {
  const distPath = path.resolve(process.cwd(), 'dist');
  const indexPath = path.join(distPath, 'index.html');
  if (!fs.existsSync(indexPath)) return next();

  try {
    const webOrigin = inferOriginFromRequest(req) || siteOriginFromConfig();
    if (!webOrigin) {
      console.error('[blog-index-html] missing web origin (set WEB_ORIGIN or trust proxy + X-Forwarded-*)');
      return next();
    }

    const posts = await Post.find({ published: true })
      .select('slug title updatedAt')
      .sort({ updatedAt: -1 })
      .lean();

    const raw = fs.readFileSync(indexPath, 'utf8');
    const html = injectBlogIndexHtml(raw, webOrigin, posts);
    setInlineHtmlHeaders(res);
    res.setHeader('Cache-Control', 'public, max-age=120, s-maxage=120, stale-while-revalidate=300');
    res.send(html);
  } catch (err) {
    next(err);
  }
}

/**
 * إنتاج: index.html مع وسوم المقال — فيسبوك/واتساب/قوقل تقرأ HTML دون تنفيذ JS.
 */
async function sendBlogPostIndexHtml(req, res, next) {
  let slug = req.params.slug;
  if (slug) {
    try {
      slug = decodeURIComponent(slug);
    } catch {
      /* keep raw */
    }
  }
  if (!slug) return next();

  const distPath = path.resolve(process.cwd(), 'dist');
  const indexPath = path.join(distPath, 'index.html');
  if (!fs.existsSync(indexPath)) return next();

  try {
    const webOrigin = inferOriginFromRequest(req) || siteOriginFromConfig();
    if (!webOrigin) {
      console.error('[blog-post-html] missing web origin (set WEB_ORIGIN or trust proxy + X-Forwarded-*)');
      return next();
    }

    const post = await Post.findOne({ slug, published: true }).lean();
    const raw = fs.readFileSync(indexPath, 'utf8');

    if (!post) {
      const html = injectBlogNotFoundHtml(raw, webOrigin);
      setInlineHtmlHeaders(res);
      res.setHeader('Cache-Control', 'public, max-age=60');
      res.status(404).send(html);
      return;
    }

    const html = injectBlogPostIndexHtml(raw, post, webOrigin);
    setInlineHtmlHeaders(res);
    res.setHeader('Cache-Control', 'public, max-age=120, s-maxage=120, stale-while-revalidate=300');
    res.send(html);
  } catch (err) {
    next(err);
  }
}

module.exports = { sendBlogPostIndexHtml, sendBlogIndexHtml };
