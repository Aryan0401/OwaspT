import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    // Gzip
    compression({ algorithm: 'gzip', ext: '.gz', threshold: 1024 }),
    // Brotli
    compression({ algorithm: 'brotliCompress', ext: '.br', threshold: 1024 }),
  ],
  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.warn', 'console.info'],
        passes: 2,
      },
      mangle: { safari10: true },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Isolate Three.js ecosystem (largest deps)
          'vendor-three': ['three'],
          'vendor-r3f': ['@react-three/fiber', '@react-three/drei', '@react-three/postprocessing', 'postprocessing'],
          // React core
          'vendor-react': ['react', 'react-dom'],
          // UI utilities
          'vendor-ui': ['animejs', 'lucide-react'],
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.name?.split('.').pop()
          if (['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg', 'ico'].includes(ext)) {
            return 'assets/img/[name]-[hash][extname]'
          }
          if (['woff', 'woff2', 'ttf', 'eot'].includes(ext)) {
            return 'assets/fonts/[name]-[hash][extname]'
          }
          return 'assets/[ext]/[name]-[hash][extname]'
        },
      },
    },
    // Inline assets smaller than 4 KB
    assetsInlineLimit: 4096,
    sourcemap: false,
    // Warn on chunks larger than 600 KB
    chunkSizeWarningLimit: 600,
  },
})

