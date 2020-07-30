import { defineConfig } from 'umi';
import { resolve } from 'path';

export default defineConfig({
  // devtool: "source-map", // enum
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],

  proxy: {
    '/api': {
      target: 'http://jsonplaceholder.typicode.com/',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  },

  alias: { '@': resolve(__dirname, '../src') }, //别名
});
