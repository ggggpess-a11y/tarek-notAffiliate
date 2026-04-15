import { useEffect } from 'react';

const QUIZ_SRC = '/js/earnings-quiz.js';

/** يضمن تحميل سكربت الكويز إن وُجد التاج في index أو يُضاف كاحتياط */
export function useEarningsQuizScript() {
  useEffect(() => {
    const already = document.querySelector(
      `script[src="${QUIZ_SRC}"], script[src*="earnings-quiz.js"]`
    );
    if (already) return;
    const s = document.createElement('script');
    s.src = QUIZ_SRC;
    s.defer = true;
    document.body.appendChild(s);
  }, []);
}
