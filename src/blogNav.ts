/** يُطلق بعد pushState للتنقل داخل التطبيق دون إعادة تحميل الصفحة */
export const SAMEPAGE_NAV_EVENT = 'samepage-nav';

/** تنقل إلى مسار المدونة داخل نفس الأصل (لا يعيد تحميل الصفحة) */
export function navigateToBlogPath(path: string) {
  if (!path.startsWith('/blog')) {
    window.location.assign(path);
    return;
  }
  window.history.pushState({}, '', path);
  window.scrollTo(0, 0);
  window.dispatchEvent(new Event(SAMEPAGE_NAV_EVENT));
}
