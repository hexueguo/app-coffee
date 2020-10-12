import { defineConfig } from 'umi';
import { resolve, join } from 'path';

export default defineConfig({
  devtool: 'source-map', // enum
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],

  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3000',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  },

  alias: {
    '@': resolve(__dirname, './src'),
    assets: resolve(__dirname, './src/assets'),
    utils: resolve(__dirname, './src/utils'),
    services: resolve(__dirname, './src/services'),
    components: join(process.cwd(), 'src', 'components'),
    // config: resolve(__dirname, './src/config'),
  }, //别名
});
