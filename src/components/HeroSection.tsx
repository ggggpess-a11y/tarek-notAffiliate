import { JoinPartnerLink } from './JoinPartnerLink';

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex flex-col overflow-x-hidden scroll-mt-28 md:shrink-0"
    >
      <div className="hero-sports-bg pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
      <div
        className="hero-sports-bg-fade pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-[2] amber-glow pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-1/4 -start-24 z-[2] w-72 h-72 max-md:w-64 max-md:h-64 md:w-80 xl:w-96 bg-primary-container/10 rounded-full blur-[100px] md:blur-[110px] xl:blur-[120px] pointer-events-none md:opacity-80"
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-7xl mx-auto w-full min-h-0 max-md:flex max-md:flex-col max-md:flex-1 max-md:min-h-0 max-md:justify-start max-md:gap-6 sm:max-md:gap-7 md:grid md:grid-cols-[1fr_minmax(220px,min(400px,48vw))] lg:grid-cols-[1fr_minmax(260px,440px)] xl:grid-cols-[1fr_minmax(300px,470px)] md:flex-none md:items-stretch md:gap-x-6 md:gap-y-6 md:content-start lg:gap-x-8 xl:gap-x-10 2xl:grid-cols-[1fr_minmax(320px,490px)] 2xl:gap-x-16 2xl:gap-y-7 md:text-start [&>*]:min-w-0">
        <div className="inline-flex w-fit max-w-full max-md:order-1 max-md:self-start md:col-start-1 md:row-start-1 md:justify-self-start md:self-start items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-surface-container-highest/95 border border-outline-variant/10 shrink-0 shadow-sm shadow-black/10">
          <span className="w-2 h-2 shrink-0 rounded-full bg-primary-container animate-pulse" aria-hidden="true" />
          <span className="text-[10px] sm:text-xs font-bold tracking-wide text-primary-container/95 sm:tracking-widest leading-snug">
            نمو عالٍ · شبكة شركاء عالمية
          </span>
        </div>
        <h1 className="hero-intro-title max-md:order-2 md:col-start-1 md:row-start-2 font-headline tracking-tight text-pretty text-on-background mb-0 sm:mb-4 max-md:mb-0 w-full min-w-0 shrink-0 max-md:font-black max-md:tracking-tight max-md:leading-[1.1] md:max-w-none md:font-extrabold md:tracking-tight md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-7xl md:leading-[1.08]">
          <span className="block text-on-background max-md:font-black max-md:text-5xl sm:max-md:text-6xl md:font-extrabold md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-7xl md:leading-[1.08] max-md:max-w-full">
            <span className="block max-md:leading-[1.1] md:inline max-sm:text-5xl">حقق ربحاً على </span>
            <span className="block max-md:leading-[1.1] max-md:mt-1.5 max-sm:mt-1 md:mt-0 md:inline max-sm:text-5xl">
              كل عميلٍ تحيله
            </span>
          </span>
          <span className="block text-primary-container max-md:font-black max-md:text-6xl sm:max-md:text-7xl max-md:mt-4 max-sm:mt-3 sm:max-md:mt-5 md:mt-1 md:font-extrabold md:text-5xl lg:text-6xl xl:text-5xl 2xl:text-6xl md:leading-[1.1] max-md:leading-[1.1] max-md:max-w-full">
            <span className="block max-md:leading-[1.1] md:inline max-sm:text-4xl">بعمولة </span>
            <span className="block max-md:leading-[1.1] max-md:mt-1 md:mt-0 md:inline max-sm:text-4xl">تصل إلى </span>
            <span className="block max-md:leading-[1.1] max-md:mt-1 md:mt-0 md:inline max-sm:text-4xl">
              <span dir="ltr" className="tabular-nums whitespace-nowrap">
                ‎50%
              </span>{' '}
              مدى الحياة
            </span>
          </span>
        </h1>
        <h2
          id="hero-quiz-headline"
          className="max-md:order-2 md:col-start-1 md:row-start-2 text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-primary-container mb-0 max-md:mb-0 md:mb-4 w-full"
          hidden
          aria-hidden="true"
        />
        <div
          id="hero-earnings-quiz"
          className="hero-money-block hero-earnings-quiz hero-earnings-quiz--hero-mobile z-10 w-full min-h-0 shrink max-md:order-3 max-md:w-full max-md:max-w-lg max-md:mx-auto max-md:text-start md:col-start-2 md:row-start-1 md:row-span-6 md:max-w-none md:self-stretch md:justify-self-stretch md:h-full md:min-h-0 md:text-start"
          aria-label="تقدير دخل تقريبي عبر اختبار قصير"
        >
          <div className="earnings-quiz-inner" />
        </div>
        <div
          className="max-md:order-4 max-md:flex-1 max-md:min-h-0 max-md:min-w-0 w-full min-h-0 md:hidden"
          aria-hidden="true"
        />
        <p className="hero-intro-sub max-md:order-5 md:col-start-1 md:row-start-3 md:hidden text-[0.9375rem] md:text-base text-on-surface-variant max-md:max-w-2xl mb-0 leading-[1.55] shrink-0">
          منصة واحدة للرياضة والكازينو والألعاب مع دعم الشركاء. جرّب التقدير ثم انضم أو استكشف المنتجات.
        </p>
        <p className="hero-intro-sub max-md:order-5 md:col-start-1 md:row-start-3 hidden md:block text-[0.9375rem] sm:text-lg xl:text-lg text-on-surface-variant max-w-xl mb-0 leading-[1.55] sm:leading-relaxed shrink-0">
          منصة واحدة للرياضة والكازينو والألعاب: عروض عالية التحويل، نماذج دفع مرنة، ومواد تسويق جاهزة مع دعم الشركاء. جرّب تقدير الدخل عبر الاختبار القصير، ثم سجّل كشريك أو استكشف المنتجات.
        </p>
        <div className="hidden md:flex md:order-6 md:col-start-1 md:row-start-4 flex-col md:flex-row gap-3 md:gap-4 w-full max-w-md md:max-w-none md:mx-0 md:justify-start shrink-0">
          <JoinPartnerLink className="inline-flex w-full md:w-auto items-center justify-center gap-1.5 px-4 py-3 sm:px-6 sm:py-3.5 rounded-[10px] bg-primary-container text-on-primary-container font-extrabold shadow-[0_12px_36px_rgba(255,193,7,0.38)] hover:brightness-110 transition-all text-center text-sm sm:text-base min-h-[2.75rem] sm:min-h-[2.75rem]">
            <span className="leading-normal">ابدأ الربح الآن</span>
            <span
              className="material-symbols-outlined hero-cta-arrow inline-flex shrink-0 items-center justify-center text-[1.25rem] sm:text-[1.3rem] w-[1.25rem] h-[1.25rem] sm:w-[1.3rem] sm:h-[1.3rem] font-normal leading-none"
              aria-hidden="true"
            >
              arrow_forward
            </span>
          </JoinPartnerLink>
          <a
            href="#products"
            className="inline-flex w-full md:w-auto items-center justify-center px-4 py-3 sm:px-6 sm:py-3.5 rounded-[10px] bg-surface-container-high/95 text-on-surface font-bold border border-[#FFC107]/30 hover:bg-surface-container-highest transition-all text-center text-sm sm:text-base min-h-[2.75rem] sm:min-h-[2.75rem]"
          >
            استكشف المنتجات
          </a>
        </div>
      </div>
    </section>
  );
}
