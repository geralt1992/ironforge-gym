import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Three static pages: home (hydrated React app), privacy policy and 404 (HTML + CSS only).
// HTML for all of them is prerendered after the build by scripts/prerender.mjs.
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  appType: 'mpa',
  build: isSsrBuild
    ? {}
    : {
        rollupOptions: {
          input: {
            main: 'index.html',
            privacy: 'politika-privatnosti.html',
            notFound: '404.html',
          },
        },
      },
}))
