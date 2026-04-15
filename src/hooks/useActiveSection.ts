import { useEffect, useState } from 'react';

const SECTION_IDS = ['home', 'products', 'rewards', 'faq'] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>('home');

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 120;
      let current: SectionId = 'home';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return active;
}
