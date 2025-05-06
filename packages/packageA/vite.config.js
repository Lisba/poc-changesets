import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'PackageA',
      fileName: 'index'
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@poc-changesets/core'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@poc-changesets/core': 'Core'
        }
      }
    }
  }
}); 