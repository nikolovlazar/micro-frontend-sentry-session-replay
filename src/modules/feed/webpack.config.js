const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'ssr',
    projectName: 'feed',
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
      port: 8081,
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
          dsn: 'https://c99febe3f6fb7acdb043f3905ed90a74@o4506044970565632.ingest.us.sentry.io/4509493008007168',
          release,
        }),
      }),
    ],
  });

  return config;
};
