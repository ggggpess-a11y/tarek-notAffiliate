const path = require('node:path');
const fs = require('node:fs');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { authRouter } = require('./routes/auth');
const { postsRouter } = require('./routes/posts');
const { config } = require('./config');

const app = express();

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

/** إنتاج بنطاق واحد: بعد `npm run build` يخدم dist + الـ API على نفس المنفذ (لا يعتمد على nginx لـ /api) */
const distPath = path.resolve(process.cwd(), 'dist');
const indexHtml = path.join(distPath, 'index.html');
const serveSpa =
  config.nodeEnv === 'production' && fs.existsSync(indexHtml);

if (serveSpa) {
  app.use(express.static(distPath, { index: false }));

  app.use((req, res, next) => {
    if (!req.path.startsWith('/api')) return next();
    res.status(404).json({ message: 'Not found' });
  });

  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    if (req.path.startsWith('/api')) return next();
    const file = req.path === '/admin.html' ? 'admin.html' : 'index.html';
    res.sendFile(path.join(distPath, file), (err) => (err ? next(err) : undefined));
  });
}

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = { app };
