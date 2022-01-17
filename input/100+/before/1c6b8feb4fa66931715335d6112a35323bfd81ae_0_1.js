function(grunt) {
  'use strict';

  // Load up npm task plugins
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-exec');
  // Load up local tasks
  grunt.loadTasks('grunt/tasks');
  grunt.loadTasks('grunt/helpers');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    lint: {
      grunt: 'grunt.js',
      tests: 'test/**/*.js',
      frontend: 'public/js/**/*.js'
    },
    recess: {
      dev: {
        src: ['public/less/**/*.less'],
        dest: 'public/dist/style.css',
        options: {
          compile: true
        }
      },
      prod: {
        src: ['public/less/*.less'],
        dest: 'public/dist/style.css',
        options: {
          compile: true,
          compress: true
        }
      }
    },
    requirejs: {
      baseUrl: 'public/js',
      name: 'main',
      mainConfigFile: 'public/js/main.js',
      out: 'public/dist/main.built.js',
      preserveLicenseComments: false
    },
    handlebars: {
      srcRoot: 'public/templates/',
      src: 'public/templates/**/*.handlebars',
      dest: 'public/dist/templates/'
    },
    mochaphantom: {
      src: 'test/**/*.js',
      requirejsConfig: '',
      // The port here must match the one used below in the server config
      testRunnerUrl: 'http://127.0.0.1:3002/testrunner/index.html'
    },
    server: {
      port: 3002,
      base: '.'
    },
    watch: {
      less: {
        files: ['<config:recess.dev.src>'],
        tasks: 'less'
      },
      lint: {
        files: ['<config:lint.client>', '<config:lint.server>'],
        tasks: 'lint'
      }
    },
    jshint: {
      // Defaults
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        strict: true,
        es5: true,
        trailing: true,
        maxlen: 80,
        browser: true
      },
      globals: {
        define: true,
        require: true
      },
      tests: {
        options: {},
        globals: {
          describe: true,
          it: true,
          expect: true,
          spyOn: true,
          beforeEach: true,
          afterEach: true,
          setFixtures: true
        }
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('less', 'recess:dev');
  grunt.registerTask('compile', 'requirejs');
  grunt.registerTask('templates', 'handlebars');

  // Does a basic build.
  grunt.registerTask('default', 'lint recess:dev');
  // Does a full production-ready build and compresses and minifies everything.
  grunt.registerTask('prod', 'lint recess:prod templates compile');
  grunt.registerTask('test', 'server mochaphantom');
}