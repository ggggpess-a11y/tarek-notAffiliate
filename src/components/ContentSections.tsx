import { JoinPartnerLink } from './JoinPartnerLink';

export function ContentSections() {
  return (
    <>
      <section className="py-24 px-6 lg:px-12 bg-surface-container-lowest" aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">
          مزايا برنامج الشركاء
        </h2>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2 bg-surface-container p-10 rounded-[2rem] flex flex-col justify-between group hover:bg-surface-container-high transition-colors">
              <div>
                <span
                  className="material-symbols-outlined text-primary-container text-5xl mb-6"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  payments
                </span>
                <h3 className="text-4xl sm:text-5xl font-headline font-bold mb-4 leading-tight">أرباح تصل إلى ‎50‎٪</h3>
                <p className="text-on-surface-variant text-lg max-w-md">
                  نظام عمولة متدرّج يكافئ جودة الزيارات: نسب تنافسية تصل إلى نصف صافي العائد، وفق نشاط اللاعبين المحالين.
                </p>
              </div>
              <div className="mt-12 flex items-center gap-4">
                <div
                  className="h-1 flex-1 bg-surface-container-highest rounded-full overflow-hidden"
                  role="presentation"
                >
                  <div className="h-full w-[50%] bg-primary-container rounded-full" />
                </div>
                <span className="text-primary-container font-bold whitespace-nowrap">قمة القطاع</span>
              </div>
            </div>
            <div className="bg-primary-container p-10 rounded-[2rem] text-on-primary-container group hover:scale-[1.02] transition-transform">
              <span
                className="material-symbols-outlined text-5xl mb-6"
                style={{ fontVariationSettings: "'FILL' 1" }}
                aria-hidden="true"
              >
                rocket_launch
              </span>
              <h3 className="text-3xl font-headline font-extrabold mb-4">أكثر من 100 مزوّد</h3>
              <p className="font-medium opacity-90">
                وصول إلى محفظة واسعة من مزوّدي الكازينو والمراهنات الرياضية ضمن منصة واحدة موحّدة.
              </p>
            </div>
            <div className="bg-surface-container p-10 rounded-[2rem] border border-outline-variant/10 group hover:bg-surface-container-high transition-colors">
              <span className="material-symbols-outlined text-primary-container text-5xl mb-6" aria-hidden="true">
                support_agent
              </span>
              <h3 className="text-3xl font-headline font-bold mb-4">دعم مخصص على مدار الساعة</h3>
              <p className="text-on-surface-variant">
                مديرو حسابات يتابعون أداءك ويساعدونك على ضبط الحملات وفق أفضل الممارسات.
              </p>
            </div>
            <div className="bg-surface-container p-10 rounded-[2rem] md:col-span-2 border border-outline-variant/10 flex flex-col md:flex-row gap-8 items-center group hover:bg-surface-container-high transition-colors">
              <div className="flex-1">
                <h3 className="text-3xl font-headline font-bold mb-4">تقارير وتحليلات</h3>
                <p className="text-on-surface-variant">لوحة بيانات لحظية مع تتبّع الروابط والتحويلات واستيفاء أهداف الحملة.</p>
              </div>
              <div
                className="w-full md:w-48 h-32 bg-surface-container-lowest rounded-xl flex items-end justify-between p-4 gap-2"
                aria-hidden="true"
              >
                <div className="w-full bg-primary/20 h-1/2 rounded-t-sm" />
                <div className="w-full bg-primary/40 h-3/4 rounded-t-sm" />
                <div className="w-full bg-primary-container h-full rounded-t-sm" />
                <div className="w-full bg-primary/60 h-2/3 rounded-t-sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="py-24 px-6 lg:px-12 scroll-mt-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl sm:text-5xl font-headline font-extrabold tracking-tight mb-4">منتجاتنا المميزة</h2>
              <p className="text-on-surface-variant text-lg sm:text-xl">
                عروض مختارة عبر الكازينو والمراهنات والألعاب لرفع معدلات التحويل لدى جمهورك.
              </p>
            </div>
            <div className="hidden md:flex gap-2 self-end md:self-auto" role="group" aria-label="تصفح العروض">
              <button
                type="button"
                id="products-prev"
                className="p-4 rounded-full border border-outline/20 hover:bg-surface-container transition-all"
                aria-label="العروض السابقة"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  chevron_right
                </span>
              </button>
              <button
                type="button"
                id="products-next"
                className="p-4 rounded-full bg-primary-container text-on-primary-container hover:shadow-lg transition-all"
                aria-label="العروض التالية"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  chevron_left
                </span>
              </button>
            </div>
          </div>
          <div id="products-track" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="group relative bg-surface-container rounded-[2rem] overflow-hidden border border-outline-variant/5">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="داخلية كازينو فاخر مع ماكينات سلوت ولمسات ذهبية"
                  src="/assets/images/product-slots.webp"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent opacity-90 pointer-events-none" />
              <div className="absolute bottom-0 start-0 p-8 w-full">
                <span className="px-3 py-1 bg-primary-container/20 text-primary-container rounded-full text-xs font-bold tracking-wider mb-4 inline-block">
                  كازينو نخبة
                </span>
                <h3 className="text-2xl font-headline font-bold mb-2">سلوتس</h3>
                <p className="text-on-surface-variant text-sm mb-6">عائد مرتفع للاعب وتراخيص عالمية</p>
                <JoinPartnerLink className="inline-flex w-full items-center justify-center py-3 bg-primary-container text-on-primary-container font-extrabold rounded-xl shadow-[0_10px_28px_rgba(255,193,7,0.35)] active:scale-95 transition-transform text-center">
                  سجّل واحصل على روابط التتبع
                </JoinPartnerLink>
              </div>
            </article>
            <article className="group relative bg-surface-container rounded-[2rem] overflow-hidden border border-outline-variant/5">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="سباق سيارات ليلي بأضواء نيون وحركة"
                  src="/assets/images/sports-stadium-2.png"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent opacity-90 pointer-events-none" />
              <div className="absolute bottom-0 start-0 p-8 w-full">
                <span className="px-3 py-1 bg-primary-container/20 text-primary-container rounded-full text-xs font-bold tracking-wider mb-4 inline-block">
                  مراهنات رياضية
                </span>
                <h3 className="text-2xl font-headline font-bold mb-2">أحداث رياضية</h3>
                <p className="text-on-surface-variant text-sm mb-6">احتمالات فورية وأحداث مباشرة</p>
                <JoinPartnerLink className="inline-flex w-full items-center justify-center py-3 bg-primary-container text-on-primary-container font-extrabold rounded-xl shadow-[0_10px_28px_rgba(255,193,7,0.35)] active:scale-95 transition-transform text-center">
                  سجّل واحصل على روابط التتبع
                </JoinPartnerLink>
              </div>
            </article>
            <article className="group relative bg-surface-container rounded-[2rem] overflow-hidden border border-outline-variant/5">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt="ملحقات ألعاب فاخرة بإضاءة عنبرية"
                  src="/assets/images/casino-dealer.png"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent opacity-90 pointer-events-none" />
              <div className="absolute bottom-0 start-0 p-8 w-full">
                <span className="px-3 py-1 bg-primary-container/20 text-primary-container rounded-full text-xs font-bold tracking-wider mb-4 inline-block">
                  موزعون مباشرون
                </span>
                <h3 className="text-2xl font-headline font-bold mb-2">كازينو</h3>
                <p className="text-on-surface-variant text-sm mb-6">طاولات مباشرة ببث 4K</p>
                <JoinPartnerLink className="inline-flex w-full items-center justify-center py-3 bg-primary-container text-on-primary-container font-extrabold rounded-xl shadow-[0_10px_28px_rgba(255,193,7,0.35)] active:scale-95 transition-transform text-center">
                  سجّل واحصل على روابط التتبع
                </JoinPartnerLink>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="rewards" className="py-24 px-6 lg:px-12 bg-surface-container-low scroll-mt-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-headline font-extrabold tracking-tight mb-4">نماذج العمولة</h2>
            <p className="text-on-surface-variant text-lg sm:text-xl max-w-2xl mx-auto">
              اختر النموذج الذي ينسجم مع حجم الزيارات وجودتها واستراتيجية النمو لديك.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 bg-surface-container rounded-[2rem] border border-outline-variant/5 hover:border-primary-container/30 transition-all">
              <div className="w-14 h-14 bg-primary-container/10 rounded-2xl flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-primary-container text-3xl" aria-hidden="true">
                  percent
                </span>
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">مشاركة الأرباح</h3>
              <p className="text-on-surface-variant mb-6">نسبة متواصلة من صافي إيرادات اللاعبين المحالين طوال فترة نشاطهم.</p>
              <div className="text-3xl font-headline font-bold text-primary mb-2">حتى ‎50‎٪</div>
              <p className="text-xs tracking-widest opacity-50">تدرج حسب الأداء</p>
            </div>
            <div className="p-10 bg-surface-container rounded-[2rem] border border-outline-variant/5 hover:border-primary-container/30 transition-all">
              <div className="w-14 h-14 bg-primary-container/10 rounded-2xl flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-primary-container text-3xl" aria-hidden="true">
                  account_balance_wallet
                </span>
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">نموذج CPA</h3>
              <p className="text-on-surface-variant mb-6">
                مقابل ثابت عن كل عميل يلبي شروط الإيداع الأول المؤهل بعد التحقق من الجودة.
              </p>
              <div className="text-3xl font-headline font-bold text-primary mb-2">بشروط مخصّصة</div>
              <p className="text-xs tracking-widest opacity-50">حسب الجغرافيا والمصدر</p>
            </div>
            <div className="p-10 bg-surface-container rounded-[2rem] border border-outline-variant/5 hover:border-primary-container/30 transition-all">
              <div className="w-14 h-14 bg-primary-container/10 rounded-2xl flex items-center justify-center mb-8">
                <span className="material-symbols-outlined text-primary-container text-3xl" aria-hidden="true">
                  layers
                </span>
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">نموذج هجين</h3>
              <p className="text-on-surface-variant mb-6">جمع بين دفعة أولية وعمولة مستمرة ضمن اتفاق يُبنى وفق أهدافك.</p>
              <div className="text-3xl font-headline font-bold text-primary mb-2">اتفاقية مرنة</div>
              <p className="text-xs tracking-widest opacity-50">بعد مراجعة الملف</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-12" aria-labelledby="steps-heading">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 w-full">
              <h2 id="steps-heading" className="text-4xl sm:text-5xl font-headline font-extrabold tracking-tight mb-8">
                ثلاث خطوات نحو <br />
                <span className="text-primary-container">تفعيل الدخل</span>
              </h2>
              <ol className="space-y-12 list-none">
                <li className="flex gap-6">
                  <span className="text-6xl font-headline font-black text-primary/10 shrink-0" aria-hidden="true">
                    01
                  </span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">تسجيل الحساب</h3>
                    <p className="text-on-surface-variant">
                      قدّم البيانات المطلوبة؛ يتمتّع الطلب بالمراجعة وفق سياسة البرنامج خلال مدة إعلانها.
                    </p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <span className="text-6xl font-headline font-black text-primary/10 shrink-0" aria-hidden="true">
                    02
                  </span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">إطلاق الحملات</h3>
                    <p className="text-on-surface-variant">
                      استفد من الروابط والتتبع والمواد التسويقية المعتمدة لاستهداف جمهورك بدقة.
                    </p>
                  </div>
                </li>
                <li className="flex gap-6">
                  <span className="text-6xl font-headline font-black text-primary/10 shrink-0" aria-hidden="true">
                    03
                  </span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">تسوية الأرباح</h3>
                    <p className="text-on-surface-variant">
                      استلام مستحقاتك دورياً عبر قنوات دفع آمنة ومعروفة، وفق جدول البرنامج.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
            <div className="flex-1 w-full">
              <div className="relative bg-surface-container h-[400px] sm:h-[500px] rounded-[3rem] overflow-hidden">
                <img
                  className="w-full h-full object-cover grayscale-[0.12] opacity-70"
                  alt="فريق عمل وتعاون يعبّر عن نمو شبكة الشركاء"
                  src="/assets/images/partner-growth-dashboard.webp"
                  width={1400}
                  height={935}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="glass-panel p-8 rounded-2xl border border-white/5 text-center max-w-sm">
                    <p className="text-sm font-bold text-primary-container tracking-widest mb-2">متوسط نمو الشركاء</p>
                    <p className="text-5xl sm:text-6xl font-headline font-black">
                      <span dir="ltr">+240%</span>
                    </p>
                    <p className="text-xs opacity-60 mt-2">خلال أول 90 يوماً</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-16 lg:py-20 px-6 lg:px-12 border-y border-outline-variant/10 bg-surface-container-lowest/80"
        aria-labelledby="partners-logos-heading"
      >
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-10 lg:mb-14 max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-[0.2em] text-primary mb-3 font-label">كازينو وسلوتس</p>
            <h2
              id="partners-logos-heading"
              className="text-2xl sm:text-3xl font-headline font-extrabold text-on-background tracking-tight mb-4"
            >
              مزوّدو ألعاب الكازينو على MELBET
            </h2>
            <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
              استوديوهات وسلوتس وبث مباشر من أشهر مزوّدي الألعاب المتاحين ضمن كازينو المنصة — جودة تُسهّل على الشركاء ترويج تجربة موثوقة.
            </p>
          </header>
          <ul
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 list-none p-0 m-0 max-sm:[&>li:nth-child(5)]:col-span-2 max-sm:[&>li:nth-child(5)]:mx-auto max-sm:[&>li:nth-child(5)]:w-full max-sm:[&>li:nth-child(5)]:max-w-[22rem]"
            role="list"
          >
            {[
              { src: '/assets/providers/pragmatic-play.svg', alt: 'شعار Pragmatic Play — مزوّد ألعاب سلوتس وكازينو مباشر' },
              { src: '/assets/providers/evolution.svg', alt: 'شعار Evolution — طاولات كازينو مباشر وبث لعروض الألعاب' },
              { src: '/assets/providers/netent.svg', alt: 'شعار NetEnt — مزوّد سلوتس وألعاب طاولة' },
              { src: '/assets/providers/playngo.svg', alt: "شعار Play'n GO — مزوّد سلوتس وألعاب جوال" },
              { src: '/assets/providers/microgaming.svg', alt: 'شعار Microgaming — مزوّد ألعاب وجوائز تراكمية' },
            ].map((logo) => (
              <li key={logo.src} className="min-h-0" role="listitem">
                <div className="h-full min-h-[10.5rem] sm:min-h-44 md:min-h-48 lg:min-h-[13rem] flex items-center justify-center rounded-2xl bg-surface-container border border-outline-variant/10 px-4 py-6 sm:px-5 sm:py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-primary-container/25 transition-colors duration-300 group">
                  <img
                    className="partner-logo-img w-full h-auto max-h-44 sm:max-h-52 md:max-h-60 lg:max-h-[13rem] object-contain object-center"
                    alt={logo.alt}
                    width={320}
                    height={64}
                    decoding="async"
                    src={logo.src}
                    loading="lazy"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
