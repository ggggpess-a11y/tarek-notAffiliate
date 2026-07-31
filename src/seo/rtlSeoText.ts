/** علامات يونيكود لعزل الاتجاه حتى لا يتداخل العربي مع الإنجليزي في عناوين/أوصاف SEO */
export const RLM = '\u200F';
export const LRI = '\u2066';
export const PDI = '\u2069';

/** يغلّف مقطعًا LTR (مثل MELBET أو conversion) حتى يبقى مرتّبًا داخل سياق RTL */
export function ltrIsolate(text: string): string {
  const s = String(text ?? '');
  if (!s) return s;
  return `${LRI}${s}${PDI}`;
}

/**
 * يعزل تسلسلات لاتينية/أرقام داخل النص العربي، ويبدأ بعلامة RTL
 * حتى تظهر عناوين مثل: «دليل… | MELBET — برنامج الشركاء» بالاتجاه الصحيح.
 */
export function rtlSeoText(text: string): string {
  const s = String(text ?? '').trim();
  if (!s) return s;
  const isolated = s.replace(/[A-Za-z][A-Za-z0-9+./_%-]*/g, (chunk) => ltrIsolate(chunk));
  return isolated.startsWith(RLM) ? isolated : `${RLM}${isolated}`;
}
