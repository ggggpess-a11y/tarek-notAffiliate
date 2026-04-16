import { BlogAdminDashboard } from './components/BlogAdminDashboard';
import { useIdleAnalytics } from './hooks/useIdleAnalytics';

export default function AdminApp() {
  useIdleAnalytics();
  return (
    <div className="flex min-h-dvh w-full flex-col bg-background text-on-background">
      <BlogAdminDashboard />
    </div>
  );
}
