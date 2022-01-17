f
  // This is the main application configuration file.  It is a Grunt
  // configuration file, which you can learn more about here:
  // https://github.com/cowboy/grunt/blob/master/docs/configuring.md
  //
  grunt.initConfig({

    // The clean task ensures all files are removed from the dist/ directory so
    // that no files linger from previous builds.
    clean: {
      compile: ["dist/compile"],
      release: ["dist/release"]
    },

    // The lint task will run the build configuration and the application
    // JavaScript through JSHint and report any errors.  You can change the
    // options for this task, by reading this:
    // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md
    lint: {
      files: [
        "app/**/*.js"
      ]
    },

    // The jshint option for scripturl is set to lax, because the anchor
    // override inside main.js needs to test for them so as to not accidentally
    // route.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true, 
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true,
        browser: true,
        scripturl: true
      },
      globals: {
        jQuery: true
      }
    },

    handlebars: {
      compile: {
        options: {
          namespace: "JST"
        },        
        files: {
          "dist/compile/templates.js":"app/templates/**/*.handlebars",
        }
      }
    },

    // The concatenate task is used here to merge the almond require/define shim
    // and the templates into the application code.  It's named
    // dist/debug/require.js, because we want to only load one script file in
    // index.html.
    concat: {
      "dist/compile/js/app.js": [
        "assets/js/libs/almond.js",
        "dist/compile/require.js",
        "assets/js/libs/modernizr-2.5.3-respond-1.1.0.min.js", // should fix with a requires later on
        "dist/compile/templates.js"
      ]
    },

    // This task uses the MinCSS Node.js project to take all your CSS files in
    // order and concatenate them into a single CSS file named index.css.  It
    // also minifies all the CSS as well.  This is named index.css, because we
    // only want to load one stylesheet in index.html.
    mincss: {
      compress: {
        files: {
          "dist/release/css/index.css": ["dist/compile/css/index.css"]
        } 
      }
    },

    // Takes the built require.js file and minifies it for filesize benefits.
    min: {
      "dist/release/js/app.js": [
        "dist/compile/js/app.js"
      ]
    },

    // Running the server without specifying an action will run the defaults,
    // port: 8080 and host: 127.0.0.1.  If you would like to change these
    // defaults, simply add in the properties `port` and `host` respectively.
    //
    // Changing the defaults might look something like this:
    //
    // server: {
    //   host: "127.0.0.1", port: 9001
    //   debug: { ... can set host and port here too ...
    //  }
    //
    //  To learn more about using the server task, please refer to the code
    //  until documentation has been written.
    server: {
      port: 8888,

      compile: {
        port: 8888
      }
    },

    watch: {
      files: ['<config:lint.files>', 'assets/**/*.less', 'app/**/*.handlebars'],
      tasks: 'lint less qunit handlebars requirejs concat'
    },

    less: {
      compile: {
        options: {
          paths: ["assets/less"]
        },
        files: {
          "dist/compile/css/index.css": "assets/less/style.less"
        }
      }
    },

    copy: {     
      compile: {
        options: {
          basePath: "assets/img"
        },         
        files: {
          "dist/compile/img": "assets/img/*"
       }
     }
    },

    // This task uses James Burke's excellent r.js AMD build tool.  In the future
    // other builders may be contributed as drop-in alternatives.
    requirejs: {
      compile: {
        options: {
          mainConfigFile: "app/config.js",
          out: "dist/compile/require.js",
          // Root application module
          name: "config",
          // Do not wrap everything in an IIFE
          wrap: false          
        }
      }   
    },

    qunit: {
      all: ["test/qunit/*.html"]
    }

  });

  grunt.loadNpmTasks('grunt-contrib');

  // The default task will remove all contents inside the dist/ folder, lint all
  // your code, precompile all the underscore templates into
  // dist/debug/templates.js, compile all the application code into
  // dist/debug/require.js, and then concatenate the require/define shim
  // almond.js and dist/debug/templates.js into the require.js file.
  grunt.registerTask("default", "clean lint less copy handlebars qunit requirejs concat");

  // The debug task is simply an alias to default to remain consistent with
  // debug/release.
  grunt.registerTask("debug", "default");

  // Watch and serve
  grunt.registerTask("launch", "server watch");

  // Test
  grunt.registerTask("test", "default qunit");

  // The release task will run the debug tasks and then minify the
  // dist/debug/require.js file and CSS files.
  grunt.registerTask("release", "default min mincss");
};