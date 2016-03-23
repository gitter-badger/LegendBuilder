var helpers = require('./helpers');

var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = {
  devtool: 'source-map',

  resolve: {
    extensions: ['', '.ts', '.js'],
    root: helpers.root('src'),
  },

  module: {
    preLoaders: [
      {test: /\.ts$/, loader: 'tslint-loader', exclude: [helpers.root('node_modules')]},
      {test: /\.js$/, loader: "source-map-loader", exclude: [
        // these packages have problems with their sourcemaps
        helpers.root('node_modules/rxjs')
      ]}

    ],

    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        query: {
          "compilerOptions": {
            "removeComments": true
          }
        },
        exclude: [ /\.e2e\.ts$/ ]
      }
    ],

    postLoaders: [
      {
        test: /\.(js|ts)$/, loader: 'istanbul-instrumenter-loader',
        include: helpers.root('src'),
        exclude: [
          /\.e2e\.ts$/,
          helpers.root('node_modules')
        ]
      }
    ]
  },

  plugins: [
    new DefinePlugin({'ENV': JSON.stringify(ENV), 'HMR': false})
  ],

  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  },

  node: {
    global: 'window',
    process: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
