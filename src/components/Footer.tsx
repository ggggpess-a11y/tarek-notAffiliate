export function Footer() {
  return (
    <footer className="bg-[#0E0E0E] w-full py-12 border-t border-[#353535]/15">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 sm:px-12 max-w-7xl mx-auto gap-6 text-center md:text-start">
        <a
          href="#home"
          className="shrink-0 flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity"
          aria-label="MELBET"
        >
          <img
            src="/assets/branding/logo-mobile.6dfa37520650ec3c782f2c72f2a9a9aa.svg"
            alt="MELBET"
            width={64}
            height={22}
            className="h-6 w-auto object-contain md:hidden"
          />
          <img
            src="/assets/branding/logo-melbet-dark.png"
            alt="MELBET"
            width={120}
            height={32}
            className="hidden h-7 sm:h-8 w-auto max-w-[120px] sm:max-w-[140px] object-contain object-center md:block"
            decoding="async"
          />
        </a>
        <nav className="flex flex-wrap justify-center gap-6 sm:gap-8 font-label text-sm tracking-wide" aria-label="تذييل الصفحة">
          <a className="text-[#B8B3AE] hover:text-[#FFE4AF] transition-colors" href="#">
            شروط الاستخدام
          </a>
          <a className="text-[#B8B3AE] hover:text-[#FFE4AF] transition-colors" href="#">
            سياسة الخصوصية
          </a>
          <a className="text-[#B8B3AE] hover:text-[#FFE4AF] transition-colors" href="#">
            اللعب المسؤول
          </a>
          <a className="text-[#B8B3AE] hover:text-[#FFE4AF] transition-colors" href="#faq">
            تواصل مع الدعم
          </a>
        </nav>
        <div className="text-[#9A9490] text-[10px] sm:text-xs tracking-wider max-w-xs md:max-w-none">
          © ‎2026‎ MELBET. صفحة تهيئة للشركاء. العلامة والشعار ملك للمرخص لهم.
        </div>
      </div>
    </footer>
  );
}
