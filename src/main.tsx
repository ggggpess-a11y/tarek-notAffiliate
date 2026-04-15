import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './critical.css';
import './styles/earnings-quiz.css';
import App from './App';
import { ErrorBoundary } from './ErrorBoundary';

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('عنصر #root غير موجود');
}

try {
  createRoot(rootEl).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
} catch (err) {
  const msg = err instanceof Error ? err.message : String(err);
  rootEl.innerHTML = `<pre style="padding:1rem;color:#fecaca;background:#1a0a0a;font-family:monospace;white-space:pre-wrap;direction:ltr;text-align:left">React failed to start:\n${msg}</pre>`;
  console.error(err);
}
