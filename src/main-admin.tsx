import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './critical.css';
import AdminApp from './AdminApp';
import { ErrorBoundary } from './ErrorBoundary';

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('عنصر #root غير موجود');
}

createRoot(rootEl).render(
  <StrictMode>
    <ErrorBoundary>
      <AdminApp />
    </ErrorBoundary>
  </StrictMode>
);
