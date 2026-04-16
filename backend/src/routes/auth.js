const crypto = require('node:crypto');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const { User } = require('../models/User');
const { config } = require('../config');
const { isProduction } = require('../utils');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

const loginSchema = z.object({
  email: z.string().email(),
  /** لا نفرض 8 أحرف هنا — قد تكون كلمة مرور البيئة أقصر؛ Mongo ما زال يستخدم bcrypt */
  password: z.string().min(1),
});

/** مقارنة آمنة زمنيًا مع كلمة المرور المخزّنة في البيئة (نص صريح، بدون bcrypt) */
function timingSafePasswordEqual(input, fromEnv) {
  if (!fromEnv) return false;
  const a = Buffer.from(String(input), 'utf8');
  const b = Buffer.from(String(fromEnv), 'utf8');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

function adminCookieOptions() {
  return {
    httpOnly: true,
    secure: isProduction(config.nodeEnv),
    sameSite: 'lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 8,
    ...(config.cookieDomain ? { domain: config.cookieDomain } : {}),
  };
}

router.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid credentials payload' });
  }

  const { email, password } = parsed.data;
  const emailLower = email.toLowerCase();
  const envEmail = config.adminEmail;
  const useEnvOnly = Boolean(envEmail && config.adminPassword);

  /**
   * إذا وُجد ADMIN_EMAIL و ADMIN_PASSWORD في البيئة: الدخول **من البيئة فقط** —
   * لا نرجع إلى Mongo حتى لا يعمل حساب قديم بنفس البريد بكلمة مرور مخزّنة في القاعدة.
   */
  if (useEnvOnly) {
    if (emailLower !== envEmail) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const validEnv = timingSafePasswordEqual(password, config.adminPassword);
    if (!validEnv) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign(
      {
        sub: 'env-admin',
        role: 'admin',
        email: envEmail,
        name: 'Admin',
      },
      config.jwtSecret,
      { expiresIn: '8h' }
    );
    res.cookie('admin_token', token, adminCookieOptions());
    return res.json({ ok: true, admin: { email: envEmail, name: 'Admin' } });
  }

  const user = await User.findOne({ email: emailLower }).lean();
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign(
    { sub: String(user._id), role: user.role, email: user.email, name: user.name },
    config.jwtSecret,
    { expiresIn: '8h' }
  );

  res.cookie('admin_token', token, adminCookieOptions());
  return res.json({ ok: true, admin: { email: user.email, name: user.name } });
});

router.post('/logout', (_req, res) => {
  res.clearCookie('admin_token', { path: '/', ...(config.cookieDomain ? { domain: config.cookieDomain } : {}) });
  return res.json({ ok: true });
});

router.get('/me', requireAdmin, (req, res) => {
  return res.json({
    ok: true,
    admin: { email: req.admin.email, name: req.admin.name, role: req.admin.role },
  });
});

module.exports = { authRouter: router };
