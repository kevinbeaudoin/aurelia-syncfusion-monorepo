const path = require('path');
var wallabyWebpack = require('wallaby-webpack');
var AureliaPlugin = require('aurelia-webpack-plugin').AureliaPlugin;
var DefinePlugin = require('webpack').DefinePlugin;
var webpack = require('webpack');


module.exports = function (wallaby) {
  var wallabyPostprocessor = wallabyWebpack({
    entryPatterns: ['test/unit/setup.js', 'test/unit/**/*.spec.js'],
    resolve: {
      modules: [
        path.join(wallaby.projectCacheDir, 'src'),
        path.join(__dirname, 'node_modules')
      ]
    },
    "node":  {
      "fs":   "empty"
    },

    module: {
      rules: [{
          test: /\.html$/i,
          loader: 'html-loader'
        },
        {
          test: /\.png$|\.gif$|\.svg$|\.jpe?g$/,
          loaders: 'null'
        },
        {
          test: /\.css$/i,
          issuer: [{
            not: [{
              test: /\.html$/i
            }]
          }],
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.css$/i,
          issuer: [{
            test: /\.html$/i
          }],
          use: 'css-loader'
        }
      ]
    },

    plugins: [
      new DefinePlugin({
        AURELIA_WEBPACK_2_0: undefined
      }),
      new AureliaPlugin({
        aureliaApp: undefined,
        viewsFor: '{' + path.relative(path.resolve(), wallaby.projectCacheDir) + '/,}**/!(tslib)*.{ts,js}'
      }),
      new webpack.NormalModuleReplacementPlugin(/\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico||scss|css)$/, 'node-noop'),
      new webpack.ProvidePlugin({})
    ]
  });

  return {
    files: [{
      pattern: 'src/**/*.+(ts|html)',
      load: false
    },
    {
      pattern: 'test/unit/setup.ts',
      load: false
    },
    {
      pattern: 'test/unit/test-configuration.ts',
      load: false
    },
  ],

    filesWithNoCoverageCalculated: ['src/app.ts', 'src/main.ts', 'src/environment.ts', 'src/samples/**/*.+(ts|html)', 'src/style/**/*.+(ts|html)', 'src/resources/**/*.+(ts|html)', 'test/**/*.+(ts|html)', 'src/components/common/constants.ts', 'src/components/common/genius-group.ts'],

    tests: [{
      pattern: 'test/unit/**/*.spec.ts',
      load: false
    }],

    env: {
      kind: 'chrome'
    },

    postprocessor: wallabyPostprocessor,

    setup: function () {
      window.__moduleBundler.loadTests();
    },

    debug: true
  };
};
