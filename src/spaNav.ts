/** يُطلق بعد pushState للتنقل داخل التطبيق دون إعادة تحميل (يحدّث App عبر useSyncedPathname) */
export const SAMEPAGE_NAV_EVENT = 'samepage-nav';

/**
 * تنقل داخل نفس الموقع بدون إعادة تحميل كاملة — يقلّل طلبات HTML من الخادم عند الرجوع للخلف.
 * لا يُستخدم لـ /admin.html (يحتاج حزمة أدمن منفصلة).
 */
export function navigateSpa(path: string) {
  if (!path.startsWith('/') || path.startsWith('//')) {
    window.location.assign(path);
    return;
  }
  if (path.startsWith('/admin')) {
    window.location.assign(path);
    return;
  }
  window.history.pushState({}, '', path);
  window.scrollTo(0, 0);
  window.dispatchEvent(new Event(SAMEPAGE_NAV_EVENT));
}
