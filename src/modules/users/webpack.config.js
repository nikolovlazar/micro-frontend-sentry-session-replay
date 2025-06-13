const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'ssr',
    projectName: 'users',
    webpackConfigEnv,
    argv,
    outputSystemJS: false,
  });

  const config = merge(defaultConfig, {
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
    },
    devServer: {
      port: 8082,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers':
          'X-Requested-With, content-type, Authorization',
      },
    },
  });

  return config;
};
