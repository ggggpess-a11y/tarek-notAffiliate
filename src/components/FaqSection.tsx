import { useCallback, useState } from 'react';

const FAQ_ITEMS: { id: number; q: string; a: string }[] = [
  {
    id: 1,
    q: 'متى تُعالَج المدفوعات؟',
    a: 'تُصرف المستحقات وفق جدول البرنامج المعتاد ( أسبوعيا كل يوم ثلاثاء ). يُحدَّد الحد الأدنى للسحب في لوحة الشركاء وقد يُعرض بعملتك المحلية.',
  },
  {
    id: 2,
    q: 'هل تقبلون زيارات من مواقع التواصل؟',
    a: 'نعم — نقبل حركة مرور متوافقة من وسائل التواصل ومحتوى المستخدمين والمؤثّرين عند الالتزام بإرشادات العلامة والقوانين المحلية. كل عرض يحدّد المصادر المسموحة، ويمكن لمدير حسابك اعتماد الإبداعات قبل التوسع.',
  },
  {
    id: 3,
    q: 'ما المناطق المدعومة؟',
    a: 'نعمل في أسواق تنظيمية رئيسية مع عروض حسب البلد. يعتمد التوفّر على تغطية الترخيص لكل علامة — ولوحة التحكم تعرض البلدان المسموحة والمقيدة لحظياً.',
  },
  {
    id: 4,
    q: 'هل يمكنني تتبع الشركاء الفرعيين؟',
    a: 'يتوفر تتبع متعدد المستويات للحسابات المعتمدة. تحصل على تقارير شفافة للمعرّفات الفرعية، واستدعاءات مخصّصة، وخيار مشاركة عائد على أحجام الشركاء الفرعيين المؤهّلين وفق الشروط المتفق عليها.',
  },
];

export function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = useCallback((id: number) => {
    setOpenId((prev) => {
      if (prev === id) return null;
      return id;
    });
  }, []);

  return (
    <section id="faq" className="py-24 px-6 lg:px-12 scroll-mt-28">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-headline font-extrabold text-center mb-16 tracking-tight">الأسئلة الشائعة</h2>
        <div className="space-y-4" id="faq-list">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`faq-item bg-surface-container rounded-2xl border border-transparent hover:border-outline-variant/20 transition-colors ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-trigger w-full text-start p-6 flex justify-between items-center gap-4 cursor-pointer group"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  id={`faq-trigger-${item.id}`}
                  onClick={() => toggle(item.id)}
                >
                  <span className="font-bold text-lg">{item.q}</span>
                  <span
                    className="material-symbols-outlined text-primary-container shrink-0 faq-icon transition-transform"
                    aria-hidden="true"
                  >
                    expand_more
                  </span>
                </button>
                <div
                  className="faq-panel px-6 pb-6 text-on-surface-variant"
                  id={`faq-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${item.id}`}
                  hidden={!isOpen}
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
