import { useEffect } from 'react';

const QUIZ_SRC = '/js/earnings-quiz.js';

type QuizWindow = Window & {
  __tarekRemountEarningsQuiz?: () => void;
};

/** يضمن تحميل سكربت الكويز، ويعيد ملء الهيرو عند الرجوع للرئيسية بعد تنقّل SPA */
export function useEarningsQuizScript() {
  useEffect(() => {
    const remount = () => {
      const fn = (window as QuizWindow).__tarekRemountEarningsQuiz;
      if (typeof fn === 'function') fn();
    };

    const already = document.querySelector(
      `script[src="${QUIZ_SRC}"], script[src*="earnings-quiz.js"]`
    );
    if (already) {
      remount();
      return;
    }

    const s = document.createElement('script');
    s.src = QUIZ_SRC;
    s.defer = true;
    document.body.appendChild(s);
  }, []);
}
