import { JoinPartnerLink } from './JoinPartnerLink';

export function FinalCta() {
  return (
    <section id="final-cta" className="py-24 px-6 lg:px-12 scroll-mt-28">
      <div className="max-w-7xl mx-auto bg-primary-container rounded-[3rem] p-8 sm:p-12 lg:p-24 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: "url('/assets/images/final-cta-texture.webp')" }}
          aria-hidden="true"
        />
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-headline font-black text-on-primary-container mb-8 leading-[1.1]">
            ابدأ كشريك اليوم
          </h2>
          <p className="text-on-primary-container/80 text-lg sm:text-xl max-w-2xl mx-auto mb-12">
            انضم إلى برنامج الشركاء الرسمي، وفّر لجمهورك عروضاً موثوقة، وابنِ دخلك وفق نماذج عمولة واضحة وشفافة.
          </p>
          <JoinPartnerLink className="inline-flex items-center justify-center px-8 sm:px-12 py-5 sm:py-6 bg-[#131313] text-primary-container rounded-2xl font-black text-lg sm:text-xl hover:scale-105 transition-transform shadow-2xl">
            طلب الانضمام للبرنامج
          </JoinPartnerLink>
        </div>
      </div>
    </section>
  );
}
