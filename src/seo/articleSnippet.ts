import type { BlogPost } from '../blogData';

const DEFAULT_MAX = 170;

function stripHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(s: string, maxLen: number): string {
  if (s.length <= maxLen) return s;
  return `${s.slice(0, Math.max(0, maxLen - 1))}…`;
}

/** وصف للـ meta / OG: المقتطف أو جزء من نص المقال بدون HTML */
export function articleSnippet(post: BlogPost, maxLen = DEFAULT_MAX): string {
  const ex = post.excerpt.trim().replace(/\s+/g, ' ');
  if (ex.length >= 40) {
    return truncate(ex, maxLen);
  }
  const plain = stripHtml(post.content || '');
  if (plain.length >= 40) {
    return truncate(plain, maxLen);
  }
  if (ex.length > 0) return truncate(ex, maxLen);
  if (plain.length > 0) return truncate(plain, maxLen);
  return post.title.trim();
}
