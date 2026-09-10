import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages is deployed under <username>.github.io/<repo>/ subpath
// so base must be set to the repo name, otherwise asset paths will 404
export default defineConfig({
  plugins: [react()],
  base: '/JuicyPlayer.github.io/',
})
