import { argv } from 'yargs';
import webpackConfig from '../../../tools/webpack.config';

const webpackTestConfig = {
  externals: { ...webpackConfig.externals, ...{
    jsdom: 'window',
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true
  } },
  devtool: 'inline-source-map',
  module: { ...webpackConfig.module, ...{
    postLoaders: [ {
      test: /\.(js|jsx)$/,
      include: new RegExp('app/scripts'),
      loader: 'isparta',
      exclude: /node_modules/
    } ]
  } },
  resolve: { ...webpackConfig.resolve, ...{
    alias: { ...webpackConfig.resolve.alias, ...{
      sinon: 'sinon/pkg/sinon'
    } }
  } }
};

export default (config) => {
  config.set({
    browsers: [ 'Chrome' ],
    singleRun: !argv.watch,
    frameworks: [ 'mocha', 'chai' ],
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './app/scripts/__tests__/test-bundler.js'
    ],
    preprocessors: {
      './app/scripts/__tests__/test-bundler.js': [ 'webpack', 'sourcemap' ]
    },
    plugins: [
      'karma-chai',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader',
      'karma-spec-reporter',
      'karma-webpack'
    ],
    reporters: [ 'mocha', 'coverage' ],
    webpack: { ...webpackConfig, ...webpackTestConfig },
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      type: 'html',
      dir: './coverage/'
    }
  });
};
