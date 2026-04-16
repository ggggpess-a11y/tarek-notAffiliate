import { FormEvent, useEffect, useState } from 'react';
import {
  BlogPayload,
  BlogPost,
  createAdminPost,
  deleteAdminPost,
  fetchAdminPosts,
  formatBlogDate,
  getAdminSession,
  loginAdmin,
  logoutAdmin,
  updateAdminPost,
} from '../blogData';

type BlogForm = {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  imageUrl: string;
};

const EMPTY_FORM: BlogForm = {
  title: '',
  excerpt: '',
  content: '',
  author: '',
  imageUrl: '',
};

export function BlogAdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState<BlogForm>(EMPTY_FORM);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [submitError, setSubmitError] = useState('');

  async function loadAdminPosts() {
    const list = await fetchAdminPosts();
    setPosts(list);
  }

  useEffect(() => {
    getAdminSession()
      .then(async (session) => {
        if (session?.ok) {
          setIsAuthenticated(true);
          await loadAdminPosts();
        }
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    loginAdmin(email, password)
      .then(async () => {
        setAuthError('');
        setPassword('');
        setIsAuthenticated(true);
        await loadAdminPosts();
      })
      .catch((err) => {
        setAuthError(err instanceof Error ? err.message : 'تعذر تسجيل الدخول');
      });
  };

  const logout = () => {
    logoutAdmin().finally(() => {
      setIsAuthenticated(false);
      setEditingPostId(null);
      setForm(EMPTY_FORM);
      setPosts([]);
    });
  };

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const cleanTitle = form.title.trim();
    const cleanExcerpt = form.excerpt.trim();
    const cleanContent = form.content.trim();
    const cleanAuthor = form.author.trim() || 'فريق MELBET';
    const cleanImageUrl = form.imageUrl.trim() || '/assets/images/partner-growth-dashboard.webp';

    if (!cleanTitle || !cleanExcerpt || !cleanContent) return;

    const payload: BlogPayload = {
      title: cleanTitle,
      excerpt: cleanExcerpt,
      content: cleanContent,
      author: cleanAuthor,
      imageUrl: cleanImageUrl,
      published: true,
    };

    if (editingPostId) {
      updateAdminPost(editingPostId, payload)
        .then(async () => {
          await loadAdminPosts();
          setEditingPostId(null);
          setForm(EMPTY_FORM);
          setSubmitError('');
        })
        .catch((err) => setSubmitError(err instanceof Error ? err.message : 'تعذر تحديث المقال'));
    } else {
      createAdminPost(payload)
        .then(async () => {
          await loadAdminPosts();
          setForm(EMPTY_FORM);
          setSubmitError('');
        })
        .catch((err) => setSubmitError(err instanceof Error ? err.message : 'تعذر نشر المقال'));
    }
  };

  const startEdit = (post: BlogPost) => {
    setEditingPostId(post.id);
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      imageUrl: post.imageUrl,
    });
  };

  const removePost = (id: string) => {
    deleteAdminPost(id)
      .then(async () => {
        await loadAdminPosts();
        if (editingPostId === id) {
          setEditingPostId(null);
          setForm(EMPTY_FORM);
        }
      })
      .catch((err) => setSubmitError(err instanceof Error ? err.message : 'تعذر حذف المقال'));
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setForm(EMPTY_FORM);
  };

  const sortedPosts = [...posts].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  if (loading) {
    return (
      <section className="min-h-dvh w-full flex items-center justify-center px-6 py-16 bg-background">
        <p className="text-on-surface-variant">جاري التحقق من جلسة الأدمن...</p>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className="min-h-dvh w-full flex items-center justify-center px-6 py-16 bg-background">
        <div className="w-full max-w-md rounded-3xl border border-[#FFC107]/20 bg-surface-container p-8">
          <h1 className="text-3xl font-headline font-extrabold mb-3">لوحة إدارة المدونة</h1>
          <p className="text-on-surface-variant mb-6">هذه الصفحة خاصة بالأدمن فقط. أدخل كلمة المرور للمتابعة.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-surface-container-high border border-outline-variant/30 px-4 py-3 text-on-surface"
              placeholder="admin@email.com"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-surface-container-high border border-outline-variant/30 px-4 py-3 text-on-surface"
              placeholder="كلمة المرور"
              required
            />
            {authError ? <p className="text-sm text-red-300">{authError}</p> : null}
            <button
              type="submit"
              className="w-full rounded-xl bg-primary-container text-on-primary-container font-bold py-3"
            >
              دخول
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-dvh w-full py-16 px-6 lg:px-12 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-4xl font-headline font-extrabold">التحرير</h1>
          <div className="flex items-center gap-3">
            <a href="/" className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface font-bold">
              العودة للموقع
            </a>
            <button
              type="button"
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300 font-bold"
            >
              تسجيل خروج
            </button>
          </div>
        </div>

        <div className="bg-surface-container rounded-3xl border border-[#FFC107]/20 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            <label className="flex flex-col gap-2">
              <span className="text-sm text-on-surface-variant">عنوان المقال</span>
              <input
                required
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                className="rounded-xl bg-surface-container-high border border-outline-variant/30 px-4 py-3 text-on-surface"
                placeholder="مثال: 5 طرق لرفع معدل التحويل"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm text-on-surface-variant">الكاتب</span>
              <input
                value={form.author}
                onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
                className="rounded-xl bg-surface-container-high border border-outline-variant/30 px-4 py-3 text-on-surface"
                placeholder="اسم الكاتب"
              />
            </label>

            <label className="md:col-span-2 flex flex-col gap-2">
              <span className="text-sm text-on-surface-variant">ملخص قصير</span>
              <textarea
                required
                value={form.excerpt}
                onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                className="rounded-xl bg-surface-container-high border border-outline-variant/30 px-4 py-3 text-on-surface min-h-[88px]"
                placeholder="ملخص يظهر في بطاقة المقال"
              />
            </label>

            <label className="md:col-span-2 flex flex-col gap-2">
              <span className="text-sm text-on-surface-variant">المحتوى (يدعم HTML)</span>
              <textarea
                required
                value={form.content}
                onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                className="rounded-xl bg-surface-container-high border border-outline-variant/30 px-4 py-3 text-on-surface min-h-[200px] font-mono text-sm"
                placeholder="مثال: &lt;p&gt;فقرة&lt;/p&gt; أو &lt;h2&gt;عنوان&lt;/h2&gt; أو روابط وصور..."
              />
            </label>

            <label className="md:col-span-2 flex flex-col gap-2">
              <span className="text-sm text-on-surface-variant">
                رابط صورة المقال (للمعاينة والمشاركة — مسار محلي أو رابط https كامل)
              </span>
              <input
                value={form.imageUrl}
                onChange={(e) => setForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
                className="rounded-xl bg-surface-container-high border border-outline-variant/30 px-4 py-3 text-on-surface"
                placeholder="/assets/images/your-image.webp"
              />
            </label>

            <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary-container text-on-primary-container font-bold"
              >
                {editingPostId ? 'حفظ التعديلات' : 'نشر المقال'}
              </button>
              {editingPostId ? (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-surface-container-high text-on-surface font-bold border border-outline-variant/30"
                >
                  إلغاء التعديل
                </button>
              ) : null}
            </div>
            {submitError ? <p className="md:col-span-2 text-sm text-red-300">{submitError}</p> : null}
          </form>

          <div className="space-y-3">
            {sortedPosts.map((post) => (
              <div
                key={post.id}
                className="bg-surface-container-high rounded-2xl border border-outline-variant/20 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <p className="font-bold text-on-surface">{post.title}</p>
                  <p className="text-sm text-on-surface-variant">
                    آخر تحديث: <span dir="ltr">{formatBlogDate(post.updatedAt)}</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(post)}
                    className="px-4 py-2 rounded-lg bg-primary-container/20 text-primary-container font-bold"
                  >
                    تعديل
                  </button>
                  <button
                    type="button"
                    onClick={() => removePost(post.id)}
                    className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300 font-bold"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
