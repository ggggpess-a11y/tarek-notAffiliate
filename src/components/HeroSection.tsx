import { REF_JOIN_URL } from '../constants';

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex flex-col overflow-x-hidden px-5 max-lg:px-4 lg:px-12 scroll-mt-28 py-8 max-lg:py-10 sm:py-6 lg:min-h-[calc(100dvh-6rem)] lg:py-8 lg:justify-center lg:shrink-0"
    >
      <div className="hero-sports-bg pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
      <div
        className="hero-sports-bg-fade pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-[2] amber-glow pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-1/4 -start-24 z-[2] w-96 h-96 bg-primary-container/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col min-h-0 text-start [&>*]:min-w-0 max-lg:flex max-lg:flex-col max-lg:gap-6 sm:max-lg:gap-8 lg:grid lg:grid-cols-[1fr_minmax(320px,470px)] lg:gap-x-12 xl:gap-x-16 lg:gap-y-6 lg:items-center">
        <div className="inline-flex w-fit max-w-full max-lg:order-1 lg:col-start-1 lg:row-start-1 lg:justify-self-start items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-surface-container-highest/95 border border-outline-variant/10 self-start shrink-0 shadow-sm shadow-black/10">
          <span className="w-2 h-2 shrink-0 rounded-full bg-primary-container animate-pulse" aria-hidden="true" />
          <span className="text-[10px] sm:text-xs font-bold tracking-wide text-primary-container/95 sm:tracking-widest leading-snug">
            نمو عالٍ · شبكة شركاء عالمية
          </span>
        </div>
        <h1 className="hero-intro-title max-lg:order-2 lg:col-start-1 lg:row-start-2 font-headline tracking-tight text-pretty text-on-background mb-0 sm:mb-4 max-lg:mb-0 w-full max-w-none min-w-0 shrink-0 max-lg:font-black max-lg:tracking-tight max-lg:leading-[1.1] lg:font-extrabold lg:tracking-tight lg:text-6xl xl:text-7xl lg:leading-[1.08]">
          <span className="block text-on-background max-lg:font-black max-lg:text-5xl sm:max-lg:text-6xl lg:font-extrabold lg:text-6xl xl:text-7xl lg:leading-[1.08] max-lg:max-w-full">
            <span className="block max-lg:leading-[1.1] lg:inline max-sm:text-5xl">حقق ربحاً على </span>
            <span className="block max-lg:leading-[1.1] max-lg:mt-1.5 max-sm:mt-1 lg:mt-0 lg:inline max-sm:text-5xl">
              كل عميلٍ تحيله
            </span>
          </span>
          <span className="block text-primary-container max-lg:font-black max-lg:text-6xl sm:max-lg:text-7xl max-lg:mt-4 max-sm:mt-3 sm:max-lg:mt-5 lg:mt-1 lg:font-extrabold lg:text-5xl xl:text-6xl lg:leading-[1.1] max-lg:leading-[1.1] max-lg:max-w-full">
            <span className="block max-lg:leading-[1.1] lg:inline max-sm:text-4xl">بعمولة </span>
            <span className="block max-lg:leading-[1.1] max-lg:mt-1 lg:mt-0 lg:inline max-sm:text-4xl">تصل إلى </span>
            <span className="block max-lg:leading-[1.1] max-lg:mt-1 lg:mt-0 lg:inline max-sm:text-4xl">
              <span dir="ltr" className="tabular-nums whitespace-nowrap">
                ‎50%
              </span>{' '}
              مدى الحياة
            </span>
          </span>
        </h1>
        <h2
          id="hero-quiz-headline"
          className="max-lg:order-2 lg:col-start-1 lg:row-start-2 text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-primary-container mb-0 max-lg:mb-0 lg:mb-4 w-full"
          hidden
          aria-hidden="true"
        />
        <div
          id="hero-earnings-quiz"
          className="hero-money-block hero-earnings-quiz hero-earnings-quiz--hero-mobile z-10 w-full min-h-0 shrink max-lg:order-3 max-lg:w-full max-lg:mx-0 max-lg:text-start lg:col-start-2 lg:row-start-1 lg:row-span-6 lg:self-center lg:max-w-none lg:mx-0 lg:justify-self-stretch lg:w-full"
          aria-label="تقدير دخل تقريبي عبر اختبار قصير"
        >
          <div className="earnings-quiz-inner" />
        </div>
        <p className="hero-intro-sub max-lg:order-4 lg:col-start-1 lg:row-start-3 lg:hidden text-[0.9375rem] text-on-surface-variant/95 max-lg:max-w-none mb-0 leading-[1.55] shrink-0">
          منصة واحدة للرياضة والكازينو والألعاب مع دعم الشركاء. جرّب التقدير ثم انضم أو استكشف المنتجات.
        </p>
        <p className="hero-intro-sub max-lg:order-4 lg:col-start-1 lg:row-start-3 hidden lg:block text-[0.9375rem] sm:text-lg lg:text-lg text-on-surface-variant/95 max-w-xl mb-0 leading-[1.55] sm:leading-relaxed shrink-0">
          منصة واحدة للرياضة والكازينو والألعاب: عروض عالية التحويل، نماذج دفع مرنة، ومواد تسويق جاهزة مع دعم الشركاء. جرّب تقدير الدخل عبر الاختبار القصير، ثم سجّل كشريك أو استكشف المنتجات.
        </p>
        <div className="hidden lg:flex max-lg:order-5 lg:col-start-1 lg:row-start-4 flex-col lg:flex-row gap-3 lg:gap-4 w-full max-w-md lg:max-w-none shrink-0">
          <a
            href={REF_JOIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full lg:w-auto items-center justify-center gap-1.5 px-4 py-3 sm:px-6 sm:py-3.5 lg:px-6 lg:py-3.5 rounded-[10px] bg-primary-container text-on-primary-container font-bold shadow-[0_8px_28px_rgba(255,193,7,0.28)] hover:brightness-110 transition-all text-center text-sm sm:text-base min-h-[2.75rem] sm:min-h-[2.75rem]"
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
            className="inline-flex w-full lg:w-auto items-center justify-center px-4 py-3 sm:px-6 sm:py-3.5 lg:px-6 lg:py-3.5 rounded-[10px] bg-surface-container-high/80 text-on-surface font-bold border border-outline/25 hover:bg-surface-container-high transition-all text-center text-sm sm:text-base min-h-[2.75rem] sm:min-h-[2.75rem]"
          >
            استكشف المنتجات
          </a>
        </div>
      </div>
    </section>
  );
}
