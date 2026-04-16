export const ADMIN_APP_URL =
  (import.meta.env.VITE_ADMIN_APP_URL as string | undefined)?.trim() || 'http://localhost:5173/admin.html';

export const WEB_APP_URL = (import.meta.env.VITE_WEB_APP_URL as string | undefined)?.trim() || '/';
