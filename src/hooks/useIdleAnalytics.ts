import { useEffect } from 'react';

export function useIdleAnalytics() {
  useEffect(() => {
    function loadAnalytics() {
      if (document.getElementById('tarek-analytics')) return;
      const s = document.createElement('script');
      s.id = 'tarek-analytics';
      s.src = 'https://analytics.tarek-affiliate.com/script.js';
      s.async = true;
      s.setAttribute('data-website-id', '9b88c993-325a-4960-985f-5bdd9d03324d');
      document.body.appendChild(s);
    }
    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    if (typeof w.requestIdleCallback === 'function') {
      w.requestIdleCallback(loadAnalytics, { timeout: 4000 });
    } else {
      window.addEventListener('load', loadAnalytics);
    }
  }, []);
}
