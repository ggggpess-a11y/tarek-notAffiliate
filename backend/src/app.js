const path = require('node:path');
const fs = require('node:fs');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { authRouter } = require('./routes/auth');
const { postsRouter } = require('./routes/posts');
const { registerSeoRoutes } = require('./routes/seo');
const { sendBlogPostIndexHtml, sendBlogIndexHtml } = require('./blogPostIndexHtml');
const { config } = require('./config');

const app = express();
/** خلف nginx/caddy/dokploy ليقرأ X-Forwarded-Proto/Host بشكل صحيح (مهم لـ OG و canonical) */
app.set('trust proxy', 1);

const allowedOrigins = [...new Set([config.webOrigin, config.adminOrigin].filter(Boolean))];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);

registerSeoRoutes(app);

/** إنتاج بنطاق واحد: بعد `npm run build` يخدم dist + الـ API على نفس المنفذ (لا يعتمد على nginx لـ /api) */
const distPath = path.resolve(process.cwd(), 'dist');
const indexHtml = path.join(distPath, 'index.html');
const serveSpa =
  config.nodeEnv === 'production' && fs.existsSync(indexHtml);

if (serveSpa) {
  /** يقلّل «صفحة بديلة مع canonical» لـ /index.html مقابل الصفحة الرئيسية */
  app.get('/index.html', (req, res) => {
    const q = req.url.indexOf('?');
    res.redirect(301, '/' + (q >= 0 ? req.url.slice(q) : ''));
  });

  /**
   * قائمة المدونة: لا تستخدم app.get('/blog/') منفصلًا — مع strict routing=false
   * يطابق Express مسار /blog أيضًا فيسبب 301 ذاتيًا (Location: /blog) ويُعطّل الفهرسة.
   */
  app.get('/blog', (req, res, next) => {
    const pathOnly = (req.originalUrl || req.url || '').split('?')[0];
    if (pathOnly === '/blog/') {
      return res.redirect(301, '/blog');
    }
    sendBlogIndexHtml(req, res, next).catch(next);
  });

  /** مقالات المدونة: HTML من الخادم مع Open Graph لمعاينات الشبكات الاجتماعية */
  app.get('/blog/:slug', (req, res, next) => {
    sendBlogPostIndexHtml(req, res, next).catch(next);
  });

  app.use(express.static(distPath, { index: false }));

  app.use((req, res, next) => {
    if (!req.path.startsWith('/api')) return next();
    res.status(404).json({ message: 'Not found' });
  });

  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    if (req.path.startsWith('/api')) return next();
    const file = req.path === '/admin.html' ? 'admin.html' : 'index.html';
    const absolutePath = path.join(distPath, file);
    res.sendFile(
      absolutePath,
      {
        headers: {
          'Content-Disposition': 'inline',
          'X-Content-Type-Options': 'nosniff',
        },
      },
      (err) => (err ? next(err) : undefined)
    );
  });
}

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = { app };
