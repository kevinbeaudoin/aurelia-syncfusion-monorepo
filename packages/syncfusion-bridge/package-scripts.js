const { series, crossEnv, concurrent, rimraf } = require('nps-utils');
const { config: { port: E2E_PORT } } = require('./test/protractor.conf');

module.exports = {
  scripts: {
    default: 'nps webpack',
    test: {

      default: 'nps test.karma',
      karma: {
        default: series(
          rimraf('test/coverage-karma'),
          'karma start test/karma.conf.js'
        ),
        watch: 'karma start test/karma.conf.js --auto-watch --no-single-run',
        debug: 'karma start test/karma.conf.js --auto-watch --no-single-run --debug'
      },

      lint: {
        default: 'eslint src',
        fix: 'eslint --fix'
      },
      all: concurrent({
        browser: series.nps('test.karma'),
        lint: 'nps test.lint'
      })
    },
    e2e: {
      default: concurrent({
        webpack: `webpack-dev-server --inline --port=${E2E_PORT}`,
        protractor: 'nps e2e.whenReady',
      }) + ' --kill-others --success first',
      debug: series(
        'nps installProtractor',
        'protractor test/protractor.conf.js --elementExplorer'
      ),
      whenReady: series(
        `wait-on --timeout 120000 http-get://localhost:${E2E_PORT}/index.html`,
        'nps protractor'
      ),
    },
    installProtractor: 'webdriver-manager update',
    preprotractor: 'copy aurelia_project\\environments\\e2e.ts src\\environment.ts /y',
    protractor: series(
      'nps preprotractor',
      'nps installProtractor',
      'protractor test/protractor.conf.js && nps postprotractor || nps postprotractor', // qu'il soit en succès ou non la tâche post-protractor sera lancée
    ),
    debug_protractor: series(
      'nps preprotractor',
      'nps installProtractor',
      'node --inspect-brk node_modules/protractor/bin/protractor test/protractor.conf.js && nps postprotractor || nps postprotractor', // qu'il soit en succès ou non la tâche post-protractor sera lancée
    ),
    postprotractor: 'copy aurelia_project\\environments\\prod.ts src\\environment.ts /y',
    build: 'nps webpack.build',
    webpack: {
      default: 'nps webpack.server',
      build: {
        before: rimraf('dist'),
        default: 'nps webpack.build.production',
        development: {
          default: series(
            'nps webpack.build.before',
            'webpack --progress -d'
          ),
          extractCss: series(
            'nps webpack.build.before',
            'webpack --progress -d --env.extractCss'
          ),
          serve: series.nps(
            'webpack.build.development',
            'serve'
          ),
        },
        production: {
          inlineCss: series(
            'nps webpack.build.before',
            crossEnv('NODE_ENV=production webpack --progress -p --env.production')
          ),
          default: series(
            'nps webpack.build.before',
            crossEnv('NODE_ENV=production webpack --progress -p --env.production --env.extractCss')
          ),
          serve: series.nps(
            'webpack.build.production',
            'serve'
          ),
        }
      },
      server: {
        default: `webpack-dev-server -d --devtool '#source-map' --inline --env.server`,
        extractCss: `webpack-dev-server -d --devtool '#source-map' --inline --env.server --env.extractCss`,
        hmr: `webpack-dev-server -d --devtool '#source-map' --inline --hot --env.server`
      },
    },
    serve: 'http-server dist --cors',
  },
}