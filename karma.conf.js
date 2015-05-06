// Karma configuration

var ANGULAR_JS_VERSION ="1_2_16";

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '.',

    // frameworks to use
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // Angular libs
      './../../test-runner/libs/angularjs/' + ANGULAR_JS_VERSION + '/angular.js',

      // Testing libs
      './../../test-runner/libs/angularjs/' + ANGULAR_JS_VERSION + '/angular-mocks.js',

      // Testing libs
      './../../test-runner/libs/angularjs/' + ANGULAR_JS_VERSION + '/angular-route.js',

      // App libs
      './../../test-runner/public/javascripts/**/*.js',

      // Test helper
      './../../test-runner/libs/javascript/BaseTestHelper.js',
      './test/BaseTestHelper.js',

      // CoffeeScript dependencies
      './../common-web/src/main/assets/**/*.coffee',
      './../i18n-web/src/main/assets/**/*.coffee',
      './../filters-web/src/main/assets/**/*.coffee',

      // CoffeeScript Complied JS
      './src/main/assets/user-module.coffee',
      './src/main/assets/*.coffee',
      './src/main/assets/**/*.coffee',

      // Test helper
      './test/**/*.spec.js',
      './test/**/*.spec.coffee'
    ],

    // list of files to exclude
    exclude: [
      './../../test-runner/public/javascripts/**/*.min.js',
      'target/scala-2.10/resource_managed/main/public/**/*.min.js',
      'target/scala-2.10/resource_managed/main/public/**/Extensions.*'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['junit', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['PhantomJS','Chrome'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    // JUnit XML Configuration
    junitReporter: {
      outputFile: 'target/karma-reports/junit/client-test-results.xml',
      suite: ''
    },

    // Source files, that you wanna generate coverage for
    // Do not include tests or libraries - (these files will be instrumented by Istanbul)
    preprocessors: {
        './target/classes/META-INF/resources/webjars/users-web/1.0-SNAPSHOT/user/**/*.js': ['coverage'],	
	    './../common-web/src/main/assets/**/*.coffee': ['coffee'],
	    './../i18n-web/src/main/assets/**/*.coffee': ['coffee'],
	    './../filters-web/src/main/assets/**/*.coffee': ['coffee'],
	    './**/*.coffee': ['coffee']
    },

    // Configure the reporter
    coverageReporter: {
      reporters:[
            {
                type: 'html',
                dir: 'target/karma-reports/coverage/html/'
            },
            {
                type: 'cobertura',
                dir: 'target/karma-reports/coverage/cobertura/',
                file: 'cobertura-client-coverage.xml'
            }
        ]
    }

  });
};
