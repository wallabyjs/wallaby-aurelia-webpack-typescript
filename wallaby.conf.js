var wallabyWebpack = require('wallaby-webpack');
var AureliaPlugin = require('aurelia-webpack-plugin').AureliaPlugin;
var DefinePlugin = require('webpack').DefinePlugin;

var wallabyPostprocessor = wallabyWebpack({
  entryPatterns: ['test/unit/setup.js', 'test/unit/**/*.spec.js'],
  plugins: [
    new DefinePlugin({AURELIA_WEBPACK_2_0: undefined}),
    new AureliaPlugin({
      aureliaApp: undefined
    })
  ]
});

module.exports = function () {
  return {
    files: [
      { pattern: 'src/**/*.ts', load: false },
      { pattern: 'test/unit/setup.ts', load: false}
    ],

    tests: [{
      pattern: 'test/unit/**/*.spec.ts', load: false
    }],

    env: {
      kind: 'electron'
    },

    postprocessor: wallabyPostprocessor,

    setup: function () {
      window.__moduleBundler.loadTests();
    },

    debug: true
  };
};

