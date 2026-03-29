import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = new URL(env.GUEST_API_TARGET);

  return {
    base: '/Wedding/',
    plugins: [svgr(), react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/guest-api': {
          target: apiUrl.origin,
          changeOrigin: true,
          rewrite: (path) => path.replace('/guest-api', apiUrl.pathname),
          followRedirects: true,
        },
      },
    },
  };
})
