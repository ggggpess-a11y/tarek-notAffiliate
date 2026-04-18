import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { REF_JOIN_URL } from '../constants';
import { trackJoinPartnerClick, trackRegistrationConversion } from '../lib/gtag';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'> & {
  href?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

function newClickTransactionId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `click-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/** رابط خارجي للتسجيل — يُطلق تحويل Google Ads عند النقر (التسجيل على موقع آخر) */
export function JoinPartnerLink({ href = REF_JOIN_URL, onClick, children, ...rest }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
      onClick={(e) => {
        trackRegistrationConversion({ transaction_id: newClickTransactionId() });
        trackJoinPartnerClick();
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
