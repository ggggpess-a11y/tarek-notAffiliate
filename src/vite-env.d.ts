/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** مثال: AW-18098893973/PEw7CIS24p0cEJXpnLZD من Google Ads → إجراء تحويل موقع */
  readonly VITE_GTAG_CONVERSION_REGISTRATION?: string;
  readonly VITE_GTAG_CONVERSION_VALUE?: string;
  readonly VITE_GTAG_CONVERSION_CURRENCY?: string;
  /** اسم معامل URL للعودة بعد التسجيل (الافتراضي: registration_complete) */
  readonly VITE_GTAG_REGISTRATION_COMPLETE_PARAM?: string;
  /** قيمة المعامل المتوقعة (الافتراضي: 1) */
  readonly VITE_GTAG_REGISTRATION_COMPLETE_VALUE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
