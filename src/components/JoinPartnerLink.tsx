import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { REF_JOIN_URL } from '../constants';
import { trackJoinPartnerClick } from '../lib/gtag';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'> & {
  href?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

/** رابط خارجي لصفحة الانضمام — حدث gtag للنقر فقط (ليست تحويل إتمام التسجيل) */
export function JoinPartnerLink({ href = REF_JOIN_URL, onClick, children, ...rest }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
      onClick={(e) => {
        trackJoinPartnerClick();
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
