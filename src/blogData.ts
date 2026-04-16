import { useCallback, useEffect, useMemo, useState } from 'react';

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  published?: boolean;
};

const rawApiBase = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim();
/** فارغ = نفس أصل الصفحة (`/api/...`) — بروكسي Vite في التطوير أو nginx في الإنتاج على نطاق واحد */
const API_BASE_URL = rawApiBase && rawApiBase.length > 0 ? rawApiBase.replace(/\/$/, '') : '';

const HTML_INSTEAD_OF_JSON_HINT =
  'الخادم أعاد صفحة HTML بدل بيانات الـ API. وجّه المسار /api إلى تطبيق Node (reverse proxy في nginx أو Dokploy)، أو عيّن VITE_API_BASE_URL لرابط الـ API الصحيح ثم أعد بناء الموقع.';

async function readJsonFromApiResponse<T>(res: Response): Promise<T> {
  const text = await res.text();
  const start = text.trimStart();
  if (start.startsWith('<!') || start.toLowerCase().startsWith('<html')) {
    throw new Error(HTML_INSTEAD_OF_JSON_HINT);
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(`استجابة غير صالحة من الخادم (HTTP ${res.status}).`);
  }
}

export function formatBlogDate(isoDate: string) {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('ar-SA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refreshPosts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/posts`, { credentials: 'include' });
      const data = await readJsonFromApiResponse<{ posts?: BlogPost[] }>(res);
      if (!res.ok) throw new Error('تعذّر تحميل المقالات');
      setPosts(data.posts || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'تعذّر تحميل المقالات');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshPosts();
  }, [refreshPosts]);

  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()),
    [posts]
  );

  return { posts, sortedPosts, loading, error, refreshPosts };
}

export type BlogPayload = {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  imageUrl?: string;
  published?: boolean;
};

export async function loginAdmin(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  const data = await readJsonFromApiResponse<Record<string, unknown>>(res);
  if (!res.ok) throw new Error('بيانات الدخول غير صحيحة');
  return data;
}

export async function logoutAdmin() {
  await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}

export async function getAdminSession() {
  const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
    credentials: 'include',
  });
  const data = await readJsonFromApiResponse<Record<string, unknown>>(res);
  if (!res.ok) return null;
  return data;
}

export async function fetchAdminPosts() {
  const res = await fetch(`${API_BASE_URL}/api/posts/admin/list`, {
    credentials: 'include',
  });
  const data = await readJsonFromApiResponse<{ posts?: BlogPost[] }>(res);
  if (!res.ok) throw new Error('تعذّر تحميل المقالات');
  return data.posts || [];
}

export async function createAdminPost(payload: BlogPayload) {
  const res = await fetch(`${API_BASE_URL}/api/posts/admin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  const data = await readJsonFromApiResponse<Record<string, unknown>>(res);
  if (!res.ok) throw new Error('تعذّر إنشاء المقال');
  return data;
}

export async function updateAdminPost(id: string, payload: BlogPayload) {
  const res = await fetch(`${API_BASE_URL}/api/posts/admin/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  const data = await readJsonFromApiResponse<Record<string, unknown>>(res);
  if (!res.ok) throw new Error('تعذّر تحديث المقال');
  return data;
}

export async function deleteAdminPost(id: string) {
  const res = await fetch(`${API_BASE_URL}/api/posts/admin/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  await readJsonFromApiResponse<Record<string, unknown>>(res);
  if (!res.ok) throw new Error('تعذّر حذف المقال');
}

export async function fetchPostBySlug(slug: string) {
  const res = await fetch(`${API_BASE_URL}/api/posts/${encodeURIComponent(slug)}`, {
    credentials: 'include',
  });
  const data = await readJsonFromApiResponse<{ post?: BlogPost }>(res);
  if (!res.ok) return null;
  return data.post ?? null;
}
