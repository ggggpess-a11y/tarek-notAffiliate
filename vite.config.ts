import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiPort = env.API_PORT || '4000';

  return {
    /** SPA: مسارات مثل /blog/slug تُعاد توجيهها إلى index.html في التطوير */
    appType: 'spa',
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          web: resolve(__dirname, 'index.html'),
          admin: resolve(__dirname, 'admin.html'),
        },
      },
    },
    server: {
      // يفيد معاينة المتصفح المدمجة في Cursor/VS Code وإعادة توجيه المنافذ
      host: true,
      port: 5173,
      strictPort: true,
      open: false,
      /** نطاق واحد محليًا: طلبات /api تُمرَّر إلى الـ Express (مع VITE_API_BASE_URL فارغ في الواجهة) */
      proxy: {
        '/api': {
          target: `http://127.0.0.1:${apiPort}`,
          changeOrigin: true,
        },
      },
    },
  };
});
