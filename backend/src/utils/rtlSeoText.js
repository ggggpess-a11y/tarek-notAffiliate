/** علامات يونيكود لعزل الاتجاه حتى لا يتداخل العربي مع الإنجليزي في عناوين/أوصاف SEO */
const RLM = '\u200F';
const LRI = '\u2066';
const PDI = '\u2069';

function ltrIsolate(text) {
  const s = String(text ?? '');
  if (!s) return s;
  return `${LRI}${s}${PDI}`;
}

/**
 * يعزل تسلسلات لاتينية/أرقام داخل النص العربي، ويبدأ بعلامة RTL
 * حتى تظهر عناوين مثل: «دليل… | MELBET — برنامج الشركاء» بالاتجاه الصحيح.
 */
function rtlSeoText(text) {
  const s = String(text ?? '').trim();
  if (!s) return s;
  const isolated = s.replace(/[A-Za-z][A-Za-z0-9+./_%-]*/g, (chunk) => ltrIsolate(chunk));
  return isolated.startsWith(RLM) ? isolated : `${RLM}${isolated}`;
}

module.exports = { rtlSeoText, ltrIsolate, RLM, LRI, PDI };
