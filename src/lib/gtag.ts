/**
 * Google Ads (gtag) — تتبع النقر للانتقال إلى صفحة التسجيل/الانضمام.
 *
 * لإحصاء **تحويل** في Google Ads: أنشئ إجراء تحويل من نوع «موقع» في الحساب،
 * ثم انسخ قيمة `send_to` الكاملة (مثل `AW-18098893973/AbCdEfGhIjKlMnOp`)
 * وضعها في `.env` كـ `VITE_GTAG_CONVERSION_REGISTRATION=...` ثم أعد بناء الموقع.
 */
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** قيمة send_to من Google Ads → أدوات وإعدادات → قياس التحويلات → تثبيت العلامة */
const CONVERSION_SEND_TO = import.meta.env.VITE_GTAG_CONVERSION_REGISTRATION?.trim() ?? '';

export function trackRegistrationConversion(): void {
  if (typeof window === 'undefined') return;
  const gtag = window.gtag;
  if (typeof gtag !== 'function') return;

  if (CONVERSION_SEND_TO) {
    gtag('event', 'conversion', { send_to: CONVERSION_SEND_TO });
    return;
  }

  /** بدون تسمية تحويل: حدث مخصص للتحليل (لا يعدّ تحويلاً إعلانياً حتى تضيف VITE_GTAG_CONVERSION_REGISTRATION) */
  gtag('event', 'join_partner_click', {
    event_category: 'engagement',
    event_label: 'registration_link',
    transport_type: 'beacon',
  });
}
