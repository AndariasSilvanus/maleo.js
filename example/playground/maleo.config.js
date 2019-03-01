const tsPlugin = require('@airy/maleo-typescript-plugin');
const cssPlugin = require('@airy/maleo-css-plugin');

module.exports = tsPlugin(
  cssPlugin({
    env: 'production',
    // analyzeBundle: true
    staticPages: {
      '/detail': {
        page: './src/Detail/index.tsx'
      },
      '/search': {
        page: './src/Search/index.tsx'
      }
    }
  }),
);
