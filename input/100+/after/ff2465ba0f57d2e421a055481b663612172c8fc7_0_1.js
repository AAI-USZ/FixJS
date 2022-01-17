function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? " * " + pkg.homepage + "\n" : "" %>' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n' +
        ' * \n'+
        ' * Licensed under the Apache License, Version 2.0 (the "License");\n'+
        ' * you may not use this file except in compliance with the License.\n'+
        ' * You may obtain a copy of the License at\n'+
        ' * \n'+
        ' *   http://www.apache.org/licenses/LICENSE-2.0\n'+
        ' * \n'+
        ' * Unless required by applicable law or agreed to in writing, software\n'+
        ' * distributed under the License is distributed on an "AS IS" BASIS,\n'+
        ' * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n'+
        ' * See the License for the specific language governing permissions and\n'+
        ' * limitations under the License.\n'+
        ' */'
    },

    // Javascript
    coffee: {
      app: {
        dir: 'src/',
        dest: 'tmp/javascripts'
      },
      test: {
        dir: 'test/specs',
        dest: 'tmp/test'
      }
    },
    coffeelint: {
      app: {
        dir: '<config:coffee.app.dir>'
      },
      test: {
        dir: '<config:coffee.test.dir>'
      }
    },

    // CSS
    stylus: {
      app: {
        src: ["stylesheets/**"],
        dest: "tmp/stylesheets/app"
      }
    },

    less: {
      boostrap: {
        src: 'vendor/stylesheets/bootstrap.less',
        dest: 'tmp/stylesheets/vendor/bootstrap.css'
      }
    },

    // Assets
    copy: {
      indexhtml: {
        from: 'assets/index.html',
        to: 'dist/'
      },
      images: {
        from: 'assets/images/*',
        to: 'dist/images/'
      },
      flamecss: {
        from: 'vendor/stylesheets/flame.css',
        to: 'tmp/stylesheets/vendor/'
      }
    },

    // Build

    minispade : {
      app: {
        src: 'tmp/javascripts/**',
        dest: 'dist/javascripts/<%= pkg.name %>.js',
        root: 'tmp/javascripts'
      },
      test: {
        src: 'tmp/test/**',
        dest: 'test/specs.js',
        root: 'tmp'
      }
    },

    concat: {
      vendor: {
        src: ['vendor/javascripts/console-helper.js',
              'vendor/javascripts/jquery-1.7.2.js',
              'vendor/javascripts/handlebars-1.0.0.beta.6.js',
              'vendor/javascripts/ember-latest.js',
              'vendor/javascripts/flame.js',
              'vendor/javascripts/bootstrap.js',
              'vendor/javascripts/minispade.js'],
        dest: 'dist/javascripts/vendor.js'
      },
      css: {
        src: ['<banner:meta.banner>',
              'tmp/stylesheets/vendor/flame.css',
              'tmp/stylesheets/vendor/bootstrap.css',
              'tmp/stylesheets/app/*'],
        dest: 'dist/stylesheets/<%= pkg.name %>.css'
      }
    },

    cssmin: {
      app: {
        src: '<config:concat.css.dest>',
        dest: 'dist/stylesheets/<%= pkg.name %>.min.css'
      }
    },

    // Development
    watch: {
      coffee: {
        files: 'src/**',
        tasks: 'coffeelint:app coffee:app minispade:app mocha reload'
      },
      stylus: {
        files: '<config:stylus.app.src>',
        tasks: 'stylus:app concat:css reload'
      },
      indexhtml: {
        files: 'assets/index.html',
        tasks: 'copy:indexhtml mocha reload'
      },
      images: {
        files: 'assets/images/*',
        tasks: 'copy:images reload'
      },
      vendorjs: {
        files: 'vendor/javascripts/*',
        tasks: 'concat:vendor mocha reload'
      },
      test: {
        files: 'test/specs/**',
        tasks: 'coffeelint:test coffee:test minispade:test mocha'
      }
    },

    reload: {
        port: 3333,
        proxy: {
            host: 'localhost',
            port: 3334
        }
    },

    mocha: {
      index: ['test/nujiistudio-tests.html']
    },

    server: {
      port: 3334,
      base: 'dist'
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-less');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-reload');
  // Default task.
  grunt.registerTask('default', 'coffeelint coffee stylus less copy concat minispade:app');

  grunt.registerTask('dev', 'default server reload watch');

  grunt.registerTask('test', 'default minispade:test mocha');

  grunt.registerTask('prod', 'default min');

}