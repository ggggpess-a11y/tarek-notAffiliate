import { useState } from 'react';
import { REF_JOIN_URL } from '../constants';
import { SpaLink } from './SpaLink';
import type { SectionId } from '../hooks/useActiveSection';

const navActive =
  'text-[#FFC107] font-bold border-b-2 border-[#FFC107] pb-1 font-label';
const navInactive =
  'text-[#FFE4AF]/85 font-medium hover:text-[#FFF3CD] transition-colors font-label border-b-2 border-transparent pb-1';

type NavProps = {
  activeSection: SectionId;
  baseUrl?: string;
  /** إخفاء روابط أقسام الصفحة الرئيسية (لصفحات المدونة: شعار + أزرار فقط) */
  hideSectionNav?: boolean;
};

/** جذر الموقع للشعار: من المدونة يفتح الصفحة الرئيسية كاملة وليس فقط الهاش */
function rootHomeHref(base?: string): string {
  if (!base || base === '/') return '/';
  const trimmed = base.replace(/\/$/, '');
  return `${trimmed}/`;
}

function NavSocialLinks({ className }: { className: string }) {
  return (
    <div className={className} role="group" aria-label="التواصل">
      <a
        href="https://t.me/MELBET_PARTNERS1"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center min-h-[2.75rem] min-w-[2.75rem] sm:min-h-0 sm:min-w-0 p-1.5 sm:p-2 rounded-xl text-primary hover:text-primary-container hover:bg-[#2a2a2a]/70 transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313]"
        aria-label="تيليجرام — التواصل"
      >
        <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
          />
        </svg>
      </a>
      <a
        href="https://wa.me/966500000000?text=%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D8%AC%20%D8%B4%D8%B1%D9%83%D8%A7%D8%A1%20MELBET"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center min-h-[2.75rem] min-w-[2.75rem] sm:min-h-0 sm:min-w-0 p-1.5 sm:p-2 rounded-xl text-primary hover:text-primary-container hover:bg-[#2a2a2a]/70 transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313]"
        aria-label="واتساب — التواصل"
      >
        <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
          />
        </svg>
      </a>
    </div>
  );
}

export function Nav({ activeSection, baseUrl, hideSectionNav }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  /** أي مسار تحت /blog يستخدم هيدر المدونة (بدون قائمة أقسام الصفحة الرئيسية) */
  const isBlogRoute =
    typeof window !== 'undefined' && window.location.pathname.toLowerCase().startsWith('/blog');
  const sectionNavHidden = Boolean(hideSectionNav || isBlogRoute);

  const linkClass = (section: SectionId) =>
    activeSection === section ? navActive : navInactive;
  const sectionHref = (section: SectionId) => (baseUrl ? `${baseUrl}#${section}` : `#${section}`);
  const logoHref =
    (baseUrl || isBlogRoute) ? rootHomeHref(baseUrl || '/') : '#home';

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 w-full z-50 bg-[#090909]/90 backdrop-blur-xl shadow-[0px_20px_40px_rgba(0,0,0,0.55)] border-b border-[#FFC107]/10"
      aria-label="التنقل الرئيسي"
    >
      <div className="flex justify-between items-center px-3.5 sm:px-8 py-3 sm:py-4 max-w-7xl mx-auto gap-2">
        <SpaLink
          href={logoHref}
          className="shrink-0 flex items-center py-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313] rounded-lg"
          aria-label="MELBET — الصفحة الرئيسية"
        >
          <img
            src="/assets/branding/logo-mobile.6dfa37520650ec3c782f2c72f2a9a9aa.svg"
            alt="MELBET"
            width={64}
            height={22}
            fetchPriority="high"
            decoding="async"
            className="h-6 w-auto max-w-[120px] object-contain object-start md:hidden"
          />
          <img
            src="/assets/branding/logo-melbet-dark.png"
            alt="MELBET"
            width={140}
            height={36}
            className="hidden h-7 sm:h-8 md:h-9 w-auto max-w-[140px] sm:max-w-[160px] object-contain object-start md:block"
            decoding="async"
          />
        </SpaLink>
        {!sectionNavHidden ? (
          <div className="hidden md:flex gap-8 items-center">
            <a className={`nav-link ${linkClass('home')}`} href={sectionHref('home')} data-section="home">
              الرئيسية
            </a>
            <a
              className={`nav-link ${linkClass('products')}`}
              href={sectionHref('products')}
              data-section="products"
            >
              المنتجات
            </a>
            <a
              className={`nav-link ${linkClass('rewards')}`}
              href={sectionHref('rewards')}
              data-section="rewards"
            >
              نماذج الأرباح
            </a>
            <SpaLink className={`nav-link ${navInactive}`} href="/blog">
              المدونة
            </SpaLink>
            <a className={`nav-link ${linkClass('faq')}`} href={sectionHref('faq')} data-section="faq">
              الأسئلة الشائعة
            </a>
          </div>
        ) : (
          <div className="hidden md:block flex-1" aria-hidden="true" />
        )}
        <div
          className={
            sectionNavHidden
              ? 'flex items-center gap-2 sm:gap-4 max-md:flex-1 max-md:min-w-0 max-md:justify-start max-md:gap-1 max-md:[direction:ltr] md:justify-start md:gap-4 md:[direction:inherit]'
              : 'flex items-center gap-2 sm:gap-4 max-md:flex-1 max-md:min-w-0 md:justify-start md:gap-4 md:[direction:inherit]'
          }
        >
          {sectionNavHidden ? (
            <>
              <a
                href={REF_JOIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="md:hidden inline-flex items-center justify-center shrink-0 min-h-10 px-3.5 py-2 rounded-xl bg-primary-container text-on-primary-container text-sm font-bold leading-snug shadow-md hover:brightness-110 transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313] whitespace-nowrap"
              >
                انضم الآن
              </a>
              <NavSocialLinks className="flex shrink-0 items-center gap-0 md:gap-1" />
              <a
                href={REF_JOIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center justify-center px-4 sm:px-6 py-2 rounded-xl bg-primary-container text-on-primary-container font-bold shadow-lg hover:brightness-110 transition-all active:scale-95"
              >
                انضم كشريك
              </a>
            </>
          ) : (
            <div className="flex min-w-0 flex-1 items-center max-md:justify-start max-md:[direction:ltr] max-md:gap-2 md:flex-initial md:justify-start md:gap-4">
              <button
                type="button"
                id="menu-toggle"
                className="md:hidden inline-flex shrink-0 items-center justify-center p-2 rounded-xl border border-outline/20 text-on-surface hover:bg-surface-container-high min-h-[2.75rem] min-w-[2.75rem]"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
                onClick={() => setMenuOpen((o) => !o)}
              >
                <span
                  className={`menu-toggle-icon-open block leading-none ${menuOpen ? 'hidden' : ''}`}
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    fill="currentColor"
                    className="block w-6 h-6 pointer-events-none"
                    focusable="false"
                  >
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                  </svg>
                </span>
                <span
                  className={`menu-toggle-icon-close leading-none ${menuOpen ? 'block' : 'hidden'}`}
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                    className="block w-6 h-6 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </span>
              </button>
              <div className="flex min-w-0 items-center gap-2 sm:gap-4">
                <a
                  href={REF_JOIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="md:hidden inline-flex items-center justify-center min-h-10 shrink-0 px-3.5 py-2 rounded-xl bg-primary-container text-on-primary-container text-sm font-bold leading-snug shadow-md hover:brightness-110 transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#131313] whitespace-nowrap"
                >
                  انضم الآن
                </a>
                <NavSocialLinks className="flex shrink-0 items-center gap-0.5 sm:gap-1" />
                <a
                  href={REF_JOIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center justify-center px-4 sm:px-6 py-2 rounded-xl bg-primary-container text-on-primary-container font-bold shadow-lg hover:brightness-110 transition-all active:scale-95"
                >
                  انضم كشريك
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      {!sectionNavHidden ? (
        <div
          id="mobile-menu"
          className={`border-t border-outline-variant/10 bg-[#131313]/95 backdrop-blur-xl md:hidden ${menuOpen ? '' : 'hidden'}`}
          hidden={!menuOpen}
        >
          <div className="px-4 py-4 flex flex-col gap-2">
            <a
              className="mobile-nav py-3 px-4 rounded-xl bg-surface-container text-primary font-bold"
              href={sectionHref('home')}
              onClick={closeMenu}
            >
              الرئيسية
            </a>
            <a
              className="mobile-nav py-3 px-4 rounded-xl text-on-surface hover:bg-surface-container-high"
              href={sectionHref('products')}
              onClick={closeMenu}
            >
              المنتجات
            </a>
            <a
              className="mobile-nav py-3 px-4 rounded-xl text-on-surface hover:bg-surface-container-high"
              href={sectionHref('rewards')}
              onClick={closeMenu}
            >
              نماذج الأرباح
            </a>
            <a
              className="mobile-nav py-3 px-4 rounded-xl text-on-surface hover:bg-surface-container-high"
              href={sectionHref('faq')}
              onClick={closeMenu}
            >
              الأسئلة الشائعة
            </a>
            <SpaLink
              className="mobile-nav py-3 px-4 rounded-xl text-on-surface hover:bg-surface-container-high"
              href="/blog"
              onClick={closeMenu}
            >
              المدونة
            </SpaLink>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
