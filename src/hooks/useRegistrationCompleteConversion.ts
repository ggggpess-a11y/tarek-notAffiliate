import { useEffect } from 'react';
import { trackRegistrationConversion } from '../lib/gtag';

const SESSION_KEY = 'gtag_registration_complete_fired';

/**
 * يُطلق تحويل Google Ads عند العودة للموقع بعد إتمام التسجيل خارجياً.
 * ضع في رابط العودة من منصة التسجيل (إن وُجد) نفس اسم المعامل والقيمة الافتراضيين،
 * أو عيّن VITE_GTAG_REGISTRATION_COMPLETE_PARAM و VITE_GTAG_REGISTRATION_COMPLETE_VALUE.
 */
export function useRegistrationCompleteConversion(): void {
  useEffect(() => {
    const param =
      import.meta.env.VITE_GTAG_REGISTRATION_COMPLETE_PARAM?.trim() || 'registration_complete';
    const expected =
      import.meta.env.VITE_GTAG_REGISTRATION_COMPLETE_VALUE?.trim() ?? '1';

    const params = new URLSearchParams(window.location.search);
    if (params.get(param) !== expected) return;
    if (sessionStorage.getItem(SESSION_KEY) === '1') return;
    sessionStorage.setItem(SESSION_KEY, '1');

    const transaction_id =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : `reg-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

    trackRegistrationConversion({ transaction_id });

    params.delete(param);
    const q = params.toString();
    const path = `${window.location.pathname}${q ? `?${q}` : ''}${window.location.hash}`;
    window.history.replaceState({}, '', path);
  }, []);
}
