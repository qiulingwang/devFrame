import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig((env) => {
  const viteEnv = loadEnv(env.mode, process.cwd()) as unknown as ImportMetaEnv

  return {
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src'),
      },
    },
    plugins: [vue()],
    server: {
      host: '0.0.0.0',
      port: 80,
      open: false,
      proxy: {
        '/luomacode-api': {
          target: viteEnv.VITE_APP_API_BASE_URL,
          changeOrigin: true, // 允许跨域
          rewrite: path => path.replace('/luomacode-api/', '/luomacode-api/'),
        },
        '/api': {
          target: 'http://chatmoss.aihao123.cn',
          changeOrigin: true, // 允许跨域
          rewrite: path => path.replace('api/', 'api/'),
        },

      },
    },
    build: {
      reportCompressedSize: false,
      sourcemap: false,
      commonjsOptions: {
        ignoreTryCatch: false,
      },
    },
  }
})
