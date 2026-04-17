import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { REF_JOIN_URL } from '../constants';
import { trackRegistrationConversion } from '../lib/gtag';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'> & {
  href?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

/** رابط خارجي لصفحة الانضمام مع إرسال حدث gtag عند النقر */
export function JoinPartnerLink({ href = REF_JOIN_URL, onClick, children, ...rest }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
      onClick={(e) => {
        trackRegistrationConversion();
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
