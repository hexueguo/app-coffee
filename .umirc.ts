import { defineConfig } from 'umi';
import { resolve } from 'path';

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
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  },

  alias: { '@': resolve(__dirname, '../src') }, //别名
});
