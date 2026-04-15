import { REF_JOIN_URL } from '../constants';

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex flex-col overflow-x-hidden px-5 max-xl:px-4 sm:max-xl:px-6 md:max-xl:px-10 lg:max-xl:px-14 scroll-mt-28 py-8 max-xl:py-10 sm:py-6 md:max-xl:py-12 xl:min-h-[calc(100dvh-6rem)] xl:py-8 xl:justify-center xl:shrink-0"
    >
      <div className="hero-sports-bg pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
      <div
        className="hero-sports-bg-fade pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-[2] amber-glow pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-1/4 -start-24 z-[2] w-72 h-72 max-md:w-64 max-md:h-64 md:max-xl:w-80 md:max-xl:h-80 xl:w-96 xl:h-96 bg-primary-container/10 rounded-full blur-[100px] md:max-xl:blur-[110px] xl:blur-[120px] pointer-events-none md:max-xl:opacity-80"
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col min-h-0 max-xl:flex-1 max-xl:flex max-xl:flex-col max-xl:gap-6 sm:max-xl:gap-8 md:max-xl:gap-10 md:max-xl:items-center md:max-xl:text-center text-start [&>*]:min-w-0 xl:grid xl:grid-cols-[1fr_minmax(320px,470px)] xl:flex-none xl:items-center xl:gap-x-12 xl:gap-y-6 xl:text-start 2xl:gap-x-16">
        <div className="inline-flex w-fit max-w-full max-xl:order-1 max-md:self-start md:max-xl:self-center xl:col-start-1 xl:row-start-1 xl:justify-self-start xl:self-start items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-surface-container-highest/95 border border-outline-variant/10 shrink-0 shadow-sm shadow-black/10">
          <span className="w-2 h-2 shrink-0 rounded-full bg-primary-container animate-pulse" aria-hidden="true" />
          <span className="text-[10px] sm:text-xs font-bold tracking-wide text-primary-container/95 sm:tracking-widest leading-snug">
            نمو عالٍ · شبكة شركاء عالمية
          </span>
        </div>
        <h1 className="hero-intro-title max-xl:order-2 xl:col-start-1 xl:row-start-2 font-headline tracking-tight text-pretty text-on-background mb-0 sm:mb-4 max-xl:mb-0 w-full min-w-0 shrink-0 max-xl:font-black max-xl:tracking-tight max-xl:leading-[1.1] md:max-xl:max-w-3xl xl:max-w-none xl:font-extrabold xl:tracking-tight xl:text-6xl 2xl:text-7xl xl:leading-[1.08]">
          <span className="block text-on-background max-xl:font-black max-xl:text-5xl sm:max-xl:text-6xl xl:font-extrabold xl:text-6xl 2xl:text-7xl xl:leading-[1.08] max-xl:max-w-full">
            <span className="block max-xl:leading-[1.1] xl:inline max-sm:text-5xl">حقق ربحاً على </span>
            <span className="block max-xl:leading-[1.1] max-xl:mt-1.5 max-sm:mt-1 xl:mt-0 xl:inline max-sm:text-5xl">
              كل عميلٍ تحيله
            </span>
          </span>
          <span className="block text-primary-container max-xl:font-black max-xl:text-6xl sm:max-xl:text-7xl max-xl:mt-4 max-sm:mt-3 sm:max-xl:mt-5 xl:mt-1 xl:font-extrabold xl:text-5xl 2xl:text-6xl xl:leading-[1.1] max-xl:leading-[1.1] max-xl:max-w-full">
            <span className="block max-xl:leading-[1.1] xl:inline max-sm:text-4xl">بعمولة </span>
            <span className="block max-xl:leading-[1.1] max-xl:mt-1 xl:mt-0 xl:inline max-sm:text-4xl">تصل إلى </span>
            <span className="block max-xl:leading-[1.1] max-xl:mt-1 xl:mt-0 xl:inline max-sm:text-4xl">
              <span dir="ltr" className="tabular-nums whitespace-nowrap">
                ‎50%
              </span>{' '}
              مدى الحياة
            </span>
          </span>
        </h1>
        <h2
          id="hero-quiz-headline"
          className="max-xl:order-2 xl:col-start-1 xl:row-start-2 text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-primary-container mb-0 max-xl:mb-0 xl:mb-4 w-full"
          hidden
          aria-hidden="true"
        />
        <div
          id="hero-earnings-quiz"
          className="hero-money-block hero-earnings-quiz hero-earnings-quiz--hero-mobile z-10 w-full min-h-0 shrink max-xl:order-3 max-xl:w-full max-xl:max-w-lg md:max-xl:max-w-xl max-xl:mx-auto max-md:text-start md:max-xl:text-center xl:col-start-2 xl:row-start-1 xl:row-span-6 xl:max-w-none xl:self-center xl:justify-self-stretch xl:text-start"
          aria-label="تقدير دخل تقريبي عبر اختبار قصير"
        >
          <div className="earnings-quiz-inner" />
        </div>
        <div
          className="max-xl:order-4 max-xl:flex-1 max-xl:min-h-0 max-xl:min-w-0 w-full min-h-0 xl:hidden"
          aria-hidden="true"
        />
        <p className="hero-intro-sub max-xl:order-5 xl:col-start-1 xl:row-start-3 xl:hidden text-[0.9375rem] md:max-xl:text-base text-on-surface-variant/95 max-xl:max-w-2xl md:max-xl:text-center mb-0 leading-[1.55] shrink-0">
          منصة واحدة للرياضة والكازينو والألعاب مع دعم الشركاء. جرّب التقدير ثم انضم أو استكشف المنتجات.
        </p>
        <p className="hero-intro-sub max-xl:order-5 xl:col-start-1 xl:row-start-3 hidden xl:block text-[0.9375rem] sm:text-lg xl:text-lg text-on-surface-variant/95 max-w-xl mb-0 leading-[1.55] sm:leading-relaxed shrink-0">
          منصة واحدة للرياضة والكازينو والألعاب: عروض عالية التحويل، نماذج دفع مرنة، ومواد تسويق جاهزة مع دعم الشركاء. جرّب تقدير الدخل عبر الاختبار القصير، ثم سجّل كشريك أو استكشف المنتجات.
        </p>
        <div className="hidden lg:flex max-xl:order-6 xl:col-start-1 xl:row-start-4 flex-col md:max-xl:items-center xl:flex-row gap-3 xl:gap-4 w-full max-w-md md:max-xl:max-w-xl md:max-xl:mx-auto xl:max-w-none xl:mx-0 xl:justify-start shrink-0">
          <a
            href={REF_JOIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full xl:w-auto items-center justify-center gap-1.5 px-4 py-3 sm:px-6 sm:py-3.5 xl:px-6 xl:py-3.5 rounded-[10px] bg-primary-container text-on-primary-container font-bold shadow-[0_8px_28px_rgba(255,193,7,0.28)] hover:brightness-110 transition-all text-center text-sm sm:text-base min-h-[2.75rem] sm:min-h-[2.75rem]"
          >
            <span className="leading-normal">ابدأ الربح الآن</span>
            <span
              className="material-symbols-outlined hero-cta-arrow inline-flex shrink-0 items-center justify-center text-[1.25rem] sm:text-[1.3rem] w-[1.25rem] h-[1.25rem] sm:w-[1.3rem] sm:h-[1.3rem] font-normal leading-none"
              aria-hidden="true"
            >
              arrow_forward
            </span>
          </a>
          <a
            href="#products"
            className="inline-flex w-full xl:w-auto items-center justify-center px-4 py-3 sm:px-6 sm:py-3.5 xl:px-6 xl:py-3.5 rounded-[10px] bg-surface-container-high/80 text-on-surface font-bold border border-outline/25 hover:bg-surface-container-high transition-all text-center text-sm sm:text-base min-h-[2.75rem] sm:min-h-[2.75rem]"
          >
            استكشف المنتجات
          </a>
        </div>
      </div>
    </section>
  );
}
