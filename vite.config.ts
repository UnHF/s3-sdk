import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'S3SDK',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['axios', 'crypto'],
      output: {
        globals: {
          axios: 'axios',
          crypto: 'crypto'
        }
      }
    },
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: true
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      outDir: 'dist',
      rollupTypes: true,
      bundledPackages: ['@types/*']
    })
  ],
  // 🔍 解析配置
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
