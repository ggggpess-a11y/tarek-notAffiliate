import { LandingPage } from './LandingPage';
import { BlogPage } from './components/BlogPage';
import { useEarningsQuizScript } from './hooks/useEarningsQuizScript';
import { useIdleAnalytics } from './hooks/useIdleAnalytics';

function WebLandingApp() {
  useEarningsQuizScript();
  return <LandingPage />;
}

export default function App() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isBlogRoute = pathname.startsWith('/blog');
  const blogPostSlug = isBlogRoute ? decodeURIComponent(pathname.replace(/^\/blog\/?/, '')) : '';

  useIdleAnalytics();

  return (
    <div className="flex min-h-dvh w-full flex-col bg-background text-on-background">
      {isBlogRoute ? <BlogPage postSlug={blogPostSlug || undefined} /> : <WebLandingApp />}
    </div>
  );
}
