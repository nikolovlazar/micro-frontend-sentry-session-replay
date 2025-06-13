const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');

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
    plugins: [
      sentryWebpackPlugin({
        moduleMetadata: ({ release }) => ({
          dsn: 'https://bf59d1c1d1f4f4c42e237678c5e0cdd7@o4506044970565632.ingest.us.sentry.io/4509493025832960',
          release,
        }),
      }),
    ],
  });

  return config;
};
