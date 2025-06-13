const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'ssr',
    projectName: 'admin',
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
      port: 8080,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers':
          'X-Requested-With, content-type, Authorization',
      },
    },
    plugins: [
      sentryWebpackPlugin({
        moduleMetadata: ({ release }) => ({
          dsn: 'https://d7714097bec3bed9366450dd7d75083f@o4506044970565632.ingest.us.sentry.io/4509492978712576',
          release,
        }),
      }),
    ],
  });

  return config;
};
