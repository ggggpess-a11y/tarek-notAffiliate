const path = require('node:path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const defaultWebOrigin = process.env.WEB_ORIGIN || 'http://localhost:5173';

/** مسافات زائدة في لوحات النشر تمنع المطابقة مع حقل تسجيل الدخول */
const adminEmailRaw = (process.env.ADMIN_EMAIL || '').trim();
/** أحيانًا تُلحق أسطر/مسافات بقيمة السر في واجهات النشر */
const adminPasswordRaw = (process.env.ADMIN_PASSWORD || '').trim();

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  /** Dokploy وغيرها يضبطان غالبًا PORT؛ API_PORT اختياري للتطوير المحلي */
  port: Number(process.env.PORT || process.env.API_PORT || 4000),
  mongoUri: process.env.MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
  adminEmail: adminEmailRaw.toLowerCase(),
  adminPassword: adminPasswordRaw,
  cookieDomain: process.env.COOKIE_DOMAIN || '',
  webOrigin: defaultWebOrigin,
  /** نفس أصل الموقع (نطاق واحد) ما لم يُضبط ADMIN_ORIGIN صراحةً */
  adminOrigin: process.env.ADMIN_ORIGIN || defaultWebOrigin,
};

module.exports = { config };
