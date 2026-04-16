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

## 2) مستخدم الأدمن

**تسجيل الدخول (`/api/auth/login`) يعتمد أولًا على `ADMIN_EMAIL` و`ADMIN_PASSWORD` من البيئة** (بعد إعادة تشغيل الخادم يُطبَّق أي تغيير). لا حاجة لتشغيل seed من أجل الدخول طالما هذان المتغيران مضبوطان على السيرفر.

أمر **`npm run seed:admin`** اختياري: ينشئ أو يحدّث مستخدمًا في Mongo لمن يريد نسخة احتياطية في القاعدة أو سيناريوهات قديمة؛ الدخول لا يشترط وجود سجل في Mongo إذا نجحت مطابقة البيئة.

**ملاحظة:** ملف `.env.example` للتوثيق فقط؛ الاستضافة تقرأ المتغيرات من لوحة Dokploy أو `.env` على الخادم.

## 3) Run services locally

```bash
npm run dev:api
npm run dev:web
```

- الموقع + المدونة: `http://localhost:5173`
- الأدمن: `http://localhost:5173/admin.html` (أو `npm run dev:admin` يفتح نفس المنفذ مع صفحة الأدمن — شغّل خادم Vite واحدًا فقط)
- الـ API: `http://localhost:4000` (يُستدعى من المتصفح عبر `http://localhost:5173/api/...` عندما يكون `VITE_API_BASE_URL` فارغًا في `.env`)

## 4) Production — نطاق واحد

بعد `npm run build`، الأمر **`npm start`** يشغّل Express على `PORT` (أو `API_PORT` أو 4000) ويخدم مجلد `dist` **و** مسارات `/api` معًا. لا تستخدم `serve` وحده للنشر الكامل لأن طلبات `/api` ستُرجع `index.html` وتسبب خطأ «HTML بدل JSON». للنشر الثابت فقط (خلف nginx يوجّه `/api` لخدمة Node أخرى) استخدم `npm run start:static`.

مثال: `https://yourdomain.com`

| المسار | الغرض |
|--------|--------|
| `/` | اللاندينج (SPA) |
| `/blog`, `/blog/…` | المدونة (نفس `index.html` + إعادة كتابة للمسارات) |
| `/admin.html` | لوحة الأدمن |
| `/api/…` | عكس اتجاه (reverse proxy) إلى عملية Node التي تشغّل `backend/server.js` |
| `/robots.txt`، `/sitemap.xml` | يُنشئهما Express في الإنتاج (يُفضّل ضبط `WEB_ORIGIN`) |

على خادم الـ API (أو ملف `.env` للإنتاج):

- `WEB_ORIGIN=https://yourdomain.com`
- `ADMIN_ORIGIN` غير مطلوب إن كان مطابقًا — أو ضعه نفس `WEB_ORIGIN`

عند بناء الواجهة (`npm run build`):

- `VITE_WEB_APP_URL=https://yourdomain.com`
- `VITE_ADMIN_APP_URL=https://yourdomain.com/admin.html`
- `VITE_API_BASE_URL` **فارغ** إن كان المستخدم يطلب `https://yourdomain.com/api/...` على نفس النطاق؛ أو الرابط الكامل للـ API إن كان منفصلًا

إن ظهرت رسالة في الواجهة عن **HTML بدل JSON** أو خطأ `Unexpected token '<'`: فالمتصفح يتلقى `index.html` على `/api/...` لأن **عكس التوجيه لـ `/api` غير مضبوط** أو أن المنصّة تشغّل **`serve dist` فقط**. راجع `deploy/nginx-api-location.example.conf` أو إعداد Traefik/Dokploy لربط المسار `/api` بخدمة Node.

### Dokploy

1. في إعداد التطبيق اختر **Build type: Dockerfile** (يُفضّل) واستخدم `Dockerfile` في جذر المستودع، أو اترك Nixpacks مع وجود `nixpacks.toml` الذي يفرض `npm start`.
2. **لا** تضبط نوع النشر كموقع ثابت فقط (Static) يشغّل `serve` على `dist` — ذلك يعيد `index.html` لكل طلب بما فيه `/api`.
3. متغيرات التشغيل (مثل `MONGO_URI`، `JWT_SECRET`، `WEB_ORIGIN`، `PORT`) تبقى كما هي في واجهة البيئة؛ `npm start` داخل الحاوية يشغّل `backend/server.js` ويستمع على `0.0.0.0:$PORT`.
4. اختبر بعد النشر: `https://yourdomain.com/api/health` يجب أن يعيد JSON `{"ok":true}` وليس HTML.

## 5) SEO والفهرسة (Google)

- **`WEB_ORIGIN`** يجب أن يطابق النطاق العام (مثل `https://tarek-affiliate.com`) لأن **`/robots.txt`** و **`/sitemap.xml`** يُبنَيان منه ويُدرجان روابط المدونة المنشورة من قاعدة البيانات.
- بعد النشر: أرسل **`/sitemap.xml`** في [Google Search Console](https://search.google.com/search-console) (فهرسة → ملفات Sitemap).
- الواجهة تحدّث **`title`، الوصف، canonical، Open Graph، و JSON-LD (BlogPosting)** عند فتح `/blog` ومقالات `/blog/:slug` (تنفيذ JavaScript — جوجل يفهرس ذلك عادةً بعد التقاط الصفحة).
- **`/admin.html`** معرّف بـ **`noindex`** حتى لا تُفهرس لوحة الأدمن.

## 6) ساب-دومينز (اختياري)

إن رغبت لاحقًا بفصل `admin.` أو `api.` عن الموقع، عيّن `ADMIN_ORIGIN` و`VITE_*` و`WEB_ORIGIN` وفق النطاقات الفعلية؛ الـ CORS يقبل أكثر من أصل ما دامت القيم مضبوطة في `.env`.
