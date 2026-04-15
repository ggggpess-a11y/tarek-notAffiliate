import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };

type State = { hasError: boolean; message: string };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(err: Error): State {
    return { hasError: true, message: err.message || 'خطأ غير معروف' };
  }

  componentDidCatch(err: Error, info: ErrorInfo) {
    console.error('Landing error:', err, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-dvh flex flex-col items-center justify-center gap-4 bg-[#131313] text-on-background px-6 text-center"
          role="alert"
        >
          <p className="text-lg font-bold">تعذّر تحميل الصفحة</p>
          <p className="text-sm text-on-surface-variant/90 max-w-md">{this.state.message}</p>
          <button
            type="button"
            className="rounded-lg bg-primary-container px-4 py-2 font-bold text-on-primary-container"
            onClick={() => window.location.reload()}
          >
            إعادة التحميل
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
