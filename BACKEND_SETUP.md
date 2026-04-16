# Full Split Setup (Web/Admin/API)

الإعداد الافتراضي في المشروع: **نطاق واحد** — الموقع، المدونة، لوحة الأدمن (`/admin.html`)، وطلبات الواجهة إلى `/api` على نفس الأصل (محليًا عبر بروكسي Vite، وفي الإنتاج عبر nginx أو ما شابه).

## 1) Environment

1. Copy `.env.example` to `.env`
2. Fill values, especially:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `WEB_ORIGIN` (ويمكن حذف `ADMIN_ORIGIN` ليُستمد تلقائيًا من نفس القيمة)

## 2) Seed admin user

```bash
npm run seed:admin
```

## 3) Run services locally

```bash
npm run dev:api
npm run dev:web
```

- الموقع + المدونة: `http://localhost:5173`
- الأدمن: `http://localhost:5173/admin.html` (أو `npm run dev:admin` يفتح نفس المنفذ مع صفحة الأدمن — شغّل خادم Vite واحدًا فقط)
- الـ API: `http://localhost:4000` (يُستدعى من المتصفح عبر `http://localhost:5173/api/...` عندما يكون `VITE_API_BASE_URL` فارغًا في `.env`)

## 4) Production — نطاق واحد

مثال: `https://yourdomain.com`

| المسار | الغرض |
|--------|--------|
| `/` | اللاندينج (SPA) |
| `/blog`, `/blog/…` | المدونة (نفس `index.html` + إعادة كتابة للمسارات) |
| `/admin.html` | لوحة الأدمن |
| `/api/…` | عكس اتجاه (reverse proxy) إلى عملية Node التي تشغّل `backend/server.js` |

على خادم الـ API (أو ملف `.env` للإنتاج):

- `WEB_ORIGIN=https://yourdomain.com`
- `ADMIN_ORIGIN` غير مطلوب إن كان مطابقًا — أو ضعه نفس `WEB_ORIGIN`

عند بناء الواجهة (`npm run build`):

- `VITE_WEB_APP_URL=https://yourdomain.com`
- `VITE_ADMIN_APP_URL=https://yourdomain.com/admin.html`
- `VITE_API_BASE_URL` **فارغ** إن كان المستخدم يطلب `https://yourdomain.com/api/...` على نفس النطاق؛ أو الرابط الكامل للـ API إن كان منفصلًا

إن ظهرت رسالة في الواجهة عن **HTML بدل JSON** أو خطأ `Unexpected token '<'`: فالمتصفح يتلقى `index.html` على `/api/...` لأن **عكس التوجيه لـ `/api` غير مضبوط**. راجع `deploy/nginx-api-location.example.conf` أو إعداد Traefik/Dokploy لربط المسار `/api` بخدمة Node.

## 5) ساب-دومينز (اختياري)

إن رغبت لاحقًا بفصل `admin.` أو `api.` عن الموقع، عيّن `ADMIN_ORIGIN` و`VITE_*` و`WEB_ORIGIN` وفق النطاقات الفعلية؛ الـ CORS يقبل أكثر من أصل ما دامت القيم مضبوطة في `.env`.
