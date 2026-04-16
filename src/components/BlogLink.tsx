import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { navigateToBlogPath } from '../blogNav';

type BlogLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

/**
 * رابط داخلي للمدونة: يفتح المقال/القائمة دون إعادة تحميل كاملة (SPA).
 * النقر بالزر الأوسط أو Ctrl/Cmd+نقرة يبقى يفتح تبويباً جديداً عبر href العادي.
 */
export function BlogLink({ href, onClick, children, ...rest }: BlogLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (!href.startsWith('/blog')) return;
    e.preventDefault();
    navigateToBlogPath(href);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
