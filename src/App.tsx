import { useEffect, useState } from 'react';
import { LandingPage } from './LandingPage';
import { BlogPage } from './components/BlogPage';
import { useEarningsQuizScript } from './hooks/useEarningsQuizScript';
import { useIdleAnalytics } from './hooks/useIdleAnalytics';
import { useRegistrationCompleteConversion } from './hooks/useRegistrationCompleteConversion';
import { SAMEPAGE_NAV_EVENT } from './spaNav';

function WebLandingApp() {
  useEarningsQuizScript();
  return <LandingPage />;
}

function useSyncedPathname() {
  const [pathname, setPathname] = useState(
    () => (typeof window !== 'undefined' ? window.location.pathname : '/')
  );
  useEffect(() => {
    const sync = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', sync);
    window.addEventListener(SAMEPAGE_NAV_EVENT, sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener(SAMEPAGE_NAV_EVENT, sync);
    };
  }, []);
  return pathname;
}

export default function App() {
  const pathname = useSyncedPathname();
  const isBlogRoute = pathname.startsWith('/blog');
  const blogPostSlug = isBlogRoute ? decodeURIComponent(pathname.replace(/^\/blog\/?/, '')) : '';

  useIdleAnalytics();
  useRegistrationCompleteConversion();

  return (
    <div className="flex min-h-dvh w-full flex-col bg-background text-on-background">
      {isBlogRoute ? <BlogPage postSlug={blogPostSlug || undefined} /> : <WebLandingApp />}
    </div>
  );
}
