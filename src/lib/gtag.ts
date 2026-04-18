/**
 * Google Ads (gtag) — تحويل «إتمام التسجيل» وليس النقر فقط.
 *
 * أضف `VITE_GTAG_CONVERSION_REGISTRATION` (send_to من إجراء التحويل في Google Ads)
 * وأعد بناء الموقع. القيمة/العملة اختيارية (مثل value و currency في وسم الشراء/التسجيل).
 * الإتمام الفعلي يُطلق من `useRegistrationCompleteConversion` عند `?registration_complete=1`
 * أو عند استدعاء `trackRegistrationConversion` يدوياً بعد نجاح تسجيل على الموقع.
 */
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONVERSION_SEND_TO = import.meta.env.VITE_GTAG_CONVERSION_REGISTRATION?.trim() ?? '';

const rawValue = import.meta.env.VITE_GTAG_CONVERSION_VALUE;
const parsedValue = rawValue !== undefined && String(rawValue).trim() !== '' ? Number(rawValue) : NaN;

const CONVERSION_CURRENCY = import.meta.env.VITE_GTAG_CONVERSION_CURRENCY?.trim() ?? '';

export type RegistrationConversionOptions = {
  /** يُفضَّل تمريره لتقليل تكرار العد في Google Ads */
  transaction_id?: string;
};

function buildConversionPayload(overrides?: RegistrationConversionOptions): Record<string, string | number> {
  const payload: Record<string, string | number> = { send_to: CONVERSION_SEND_TO };
  if (Number.isFinite(parsedValue)) payload.value = parsedValue;
  if (CONVERSION_CURRENCY) payload.currency = CONVERSION_CURRENCY;
  const tid = overrides?.transaction_id?.trim();
  if (tid) payload.transaction_id = tid;
  return payload;
}

/** نقر أزرار «انضمّ / سجّل» — قياس تفاعل، وليس تحويل إتمام التسجيل */
export function trackJoinPartnerClick(): void {
  if (typeof window === 'undefined') return;
  const gtag = window.gtag;
  if (typeof gtag !== 'function') return;

  gtag('event', 'join_partner_click', {
    event_category: 'engagement',
    event_label: 'registration_link',
    transport_type: 'beacon',
  });
}

/** تحويل Google Ads لإتمام التسجيل (بعد النجاح أو عند العودة بمعامل URL) */
export function trackRegistrationConversion(overrides?: RegistrationConversionOptions): void {
  if (typeof window === 'undefined') return;
  const gtag = window.gtag;
  if (typeof gtag !== 'function') return;

  if (CONVERSION_SEND_TO) {
    gtag('event', 'conversion', buildConversionPayload(overrides));
    return;
  }

  gtag('event', 'registration_complete', {
    event_category: 'conversion',
    event_label: 'registration_complete',
    transport_type: 'beacon',
  });
}
