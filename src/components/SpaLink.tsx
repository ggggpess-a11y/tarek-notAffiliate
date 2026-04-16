import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { navigateSpa } from '../spaNav';

type SpaLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

/**
 * روابط داخلية على نفس النطاق: تنقل عبر history بدون إعادة تحميل الصفحة.
 * الروابط الخارجية، والهاش المحلي (#)، و/admin.html تبقى سلوك المتصفح الافتراضي.
 */
export function SpaLink({ href, onClick, children, ...rest }: SpaLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (href.startsWith('#')) return;

    let path: string;
    try {
      const u = new URL(href, window.location.origin);
      if (u.origin !== window.location.origin) return;
      path = `${u.pathname}${u.search}${u.hash}`;
    } catch {
      return;
    }

    if (!path.startsWith('/') || path.startsWith('//')) return;
    if (path.startsWith('/admin')) return;

    e.preventDefault();
    navigateSpa(path);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
