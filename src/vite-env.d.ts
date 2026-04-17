/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** مثال: AW-18098893973/xxxxxxxxxx من Google Ads (إجراء تحويل موقع) */
  readonly VITE_GTAG_CONVERSION_REGISTRATION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
