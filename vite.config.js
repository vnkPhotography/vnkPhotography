import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The site lives at https://vnkphotography.github.io/vnkPhotography/
// `base` must match the repository name exactly (case-sensitive),
// otherwise the published site loads without styles and photos.
export default defineConfig({
  plugins: [react()],
  base: '/vnkPhotography/',
})
