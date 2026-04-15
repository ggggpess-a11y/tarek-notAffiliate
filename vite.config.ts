import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // يفيد معاينة المتصفح المدمجة في Cursor/VS Code وإعادة توجيه المنافذ
    host: true,
    port: 5173,
    strictPort: true,
    open: false,
  },
});
