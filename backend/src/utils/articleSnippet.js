/**
 * وصف للـ meta / Open Graph: المقتطف إن وُجد، وإلا نص عادي من محتوى HTML للمقال.
 * (حد أقصى ~170 حرفاً مناسب لمقتطفات Google والسوشيال)
 */
const DEFAULT_MAX = 170;

function stripHtml(html) {
  if (!html || typeof html !== 'string') return '';
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(s, maxLen) {
  if (s.length <= maxLen) return s;
  return `${s.slice(0, Math.max(0, maxLen - 1))}…`;
}

/**
 * @param {{ excerpt?: string, content?: string, title?: string }} post
 */
function articleSnippet(post, maxLen = DEFAULT_MAX) {
  const ex = (post.excerpt || '').trim().replace(/\s+/g, ' ');
  if (ex.length >= 40) {
    return truncate(ex, maxLen);
  }
  const plain = stripHtml(post.content || '');
  if (plain.length >= 40) {
    return truncate(plain, maxLen);
  }
  if (ex.length > 0) return truncate(ex, maxLen);
  if (plain.length > 0) return truncate(plain, maxLen);
  return (post.title || '').trim();
}

module.exports = { articleSnippet, stripHtml };
