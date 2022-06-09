import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from '@vuetify/vite-plugin';
import path from 'path';

const SRC_DIR = path.resolve(__dirname, './src');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const BUILD_DIR = path.resolve(__dirname, './www',);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vuetify({ styles: 'sass', autoImport: true }),
  ],
  resolve: {
    alias: {
      '@': SRC_DIR,
      '@core': SRC_DIR + '/core',
      '@views': SRC_DIR + '/views',
      '@components': SRC_DIR + '/components',
      '@services': SRC_DIR + '/core/services',
      '@entities': SRC_DIR + '/core/store/entities',
    },
  },
})
