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
      if (!res.ok) throw new Error('Failed to load posts');
      const data = (await res.json()) as { posts: BlogPost[] };
      setPosts(data.posts || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts');
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
  if (!res.ok) throw new Error('بيانات الدخول غير صحيحة');
  return res.json();
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
  if (!res.ok) return null;
  return res.json();
}

export async function fetchAdminPosts() {
  const res = await fetch(`${API_BASE_URL}/api/posts/admin/list`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch admin posts');
  const data = (await res.json()) as { posts: BlogPost[] };
  return data.posts || [];
}

export async function createAdminPost(payload: BlogPayload) {
  const res = await fetch(`${API_BASE_URL}/api/posts/admin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create post');
  return res.json();
}

export async function updateAdminPost(id: string, payload: BlogPayload) {
  const res = await fetch(`${API_BASE_URL}/api/posts/admin/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to update post');
  return res.json();
}

export async function deleteAdminPost(id: string) {
  const res = await fetch(`${API_BASE_URL}/api/posts/admin/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to delete post');
}

export async function fetchPostBySlug(slug: string) {
  const res = await fetch(`${API_BASE_URL}/api/posts/${encodeURIComponent(slug)}`, {
    credentials: 'include',
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { post: BlogPost };
  return data.post;
}
