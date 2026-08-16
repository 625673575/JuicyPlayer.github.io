import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 部署在 <username>.github.io/<repo>/ 子路径下
// 所以 base 必须设为仓库名，否则资源路径会 404
export default defineConfig({
  plugins: [react()],
  base: '/JuicyPlayer.github.io/',
})
