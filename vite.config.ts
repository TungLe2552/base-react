import { defineConfig, loadEnv } from 'vite'

import path from 'node:path'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const env = loadEnv(config.mode, process.cwd(), '')
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    plugins: [
      react(),
      svgrPlugin({
        svgrOptions: {
          icon: true
          // ...svgr options (https://react-svgr.com/docs/options/)
        }
      })
    ],
    server: {
      port: 3000,
      proxy: {
        ...(env.API_BASE_URL // Proxy API endpoints to the production base URL.
          ? {
              '^/api': {
                target: env.API_BASE_URL
              },
              '^/storage': {
                target: env.API_BASE_URL
              },
              '^/uploads': {
                target: env.API_BASE_URL
              }
            }
          : // Proxy API endpoints a local mock API.
            {})
      }
    },
    css: {
      devSourcemap: true
    }
  }
})
