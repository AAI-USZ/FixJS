function(grunt) {
  "use strict";

  grunt.file.mkdir("fixtures/output");

  grunt.initConfig({
    pkg: {
      name: "grunt-contrib",
      version: "0.3.9"
    },

    files: {
      test: "fixtures/compress/<%= pkg.name %>-<%= pkg.version %>"
    },

    test: {
      tasks: ["*_test.js"],
      clean: ["clean_task.js"]
    },

    clean: {
      output: ["fixtures/output"]
    },

    copy: {
      test: {
        options: {
          basePath: "fixtures/copy"
        },
        files: {
          "fixtures/output/copy_test_files": "fixtures/copy/*",
          "fixtures/output/copy_test_v<%= pkg.version %>": "fixtures/copy/**",
          "fixtures/output/copy_test_array": ["fixtures/copy/*.*", "fixtures/copy/folder_one/*"]
        }
      },
      flatten: {
        options: {
          flatten: true
        },
        files: {
          "fixtures/output/copy_test_flatten": "fixtures/copy/**"
        }
      },
      outside_cwd: {
        options: {
          basePath: "../bin"
        },
        files: {
          "fixtures/output/copy_test_outside_cwd": ["../bin/*"]
        }
      }
    },

    coffee: {
      compile: {
        files: {
          "fixtures/output/coffee_basic.js": "fixtures/coffee/coffee_basic.coffee",
          "fixtures/output/coffee_combined.js": ["fixtures/coffee/*.coffee"]
        },
        options: {
          bare: true
        }
      }
    },

    compress: {
      zip: {
        options: {
          mode: "zip",
          basePath: "fixtures/compress"
        },
        files: {
          "fixtures/output/compress_test_files.zip": "fixtures/compress/*",
          "fixtures/output/compress_test_v<%= pkg.version %>.zip": "fixtures/compress/**",
          "fixtures/output/compress_test_array.zip": ["fixtures/compress/test.*", "fixtures/compress/folder_one/*"],
          "fixtures/output/compress_test_files_template.zip": "<%= files.test %>/**"
        }
      },
      zip_flatten: {
        options: {
          mode: "zip",
          flatten: true
        },
        files: {
          "fixtures/output/compress_test_flatten.zip": "fixtures/compress/**"
        }
      },
      zip_outside_cwd: {
        options: {
          mode: "zip",
          basePath: "../bin"
        },
        files: {
          "fixtures/output/compress_test_outside_cwd.zip": ["../bin/*"]
        }
      },
      tar: {
        options: {
          mode: "tar",
          basePath: "fixtures/compress"
        },
        files: {
          "fixtures/output/compress_test_files.tar": "fixtures/compress/*",
          "fixtures/output/compress_test_v<%= pkg.version %>.tar": "fixtures/compress/**",
          "fixtures/output/compress_test_array.tar": ["fixtures/compress/test.*", "fixtures/compress/folder_one/*"],
          "fixtures/output/compress_test_files_template.tar": "<%= files.test %>/**"
        }
      },
      tar_flatten: {
        options: {
          mode: "tar",
          flatten: true
        },
        files: {
          "fixtures/output/compress_test_flatten.tar": "fixtures/compress/**"
        }
      },
      tar_outside_cwd: {
        options: {
          mode: "tar",
          basePath: "../bin"
        },
        files: {
          "fixtures/output/compress_test_outside_cwd.tar": ["../bin/*"]
        }
      },
      tgz: {
        options: {
          mode: "tgz",
          basePath: "fixtures/compress"
        },
        files: {
          "fixtures/output/compress_test_files.tgz": "fixtures/compress/*",
          "fixtures/output/compress_test_v<%= pkg.version %>.tgz": "fixtures/compress/**",
          "fixtures/output/compress_test_array.tgz": ["fixtures/compress/test.*", "fixtures/compress/folder_one/*"],
          "fixtures/output/compress_test_files_template.tgz": "<%= files.test %>/**"
        }
      },
      tgz_flatten: {
        options: {
          mode: "tgz",
          flatten: true
        },
        files: {
          "fixtures/output/compress_test_flatten.tgz": "fixtures/compress/**"
        }
      },
      tgz_outside_cwd: {
        options: {
          mode: "tgz",
          basePath: "../bin"
        },
        files: {
          "fixtures/output/compress_test_outside_cwd.tgz": ["../bin/*"]
        }
      },
      gzip: {
        options: {
          mode: "gzip"
        },
        files: {
          "fixtures/output/compress_test_file.gz": "fixtures/compress/test.js",
          "fixtures/output/compress_test_file2.gz": "fixtures/compress/folder_one/one.js"
        }
      }
    },

    handlebars: {
      compile: {
        options: {
          namespace: "JST"
        },
        files: {
          "fixtures/output/handlebars.js": "fixtures/handlebars/one.handlebar"
        }
      }
    },

    jade: {
      simple: {
        files: {
          "fixtures/output/jade.html": "fixtures/jade/jade.jade",
          "fixtures/output/jade2.html": "fixtures/jade/jade2.jade"
        },
        options: {
          data: {
            test: true
          }
        }
      },
      include: {
        files: {
          "fixtures/output/jadeInclude.html": "fixtures/jade/jadeInclude.jade"
        }
      },
      template: {
        files: {
          "fixtures/output/jadeTemplate.html": "fixtures/jade/jadeTemplate.jade"
        },
        options: {
          data: {
            year: "<%= grunt.template.today('yyyy') %>"
          }
        }
      }
    },

    jst: {
      compile: {
        files: {
          "fixtures/output/jst.js": "fixtures/jst/*.html"
        }
      }
    },

    less: {
      compile: {
        files: {
          "fixtures/output/less_a.css": "fixtures/less/style.less",
          "fixtures/output/less_b.css": "fixtures/less/style.less"
        },
        options: {
          paths: ["fixtures/less/include"]
        }
      }
    },

    mincss: {
      compress: {
        files: {
          "fixtures/output/style.css": ["fixtures/mincss/input_one.css", "fixtures/mincss/input_two.css"]
        }
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: "fixtures/requirejs",
          name: "project",
          out: "fixtures/output/requirejs.js"
        }
      }
    },

    stylus: {
      compile: {
        files: {
          "fixtures/output/stylus.css": "fixtures/stylus/stylus.styl"
        },
        options: {
          paths: ["fixtures/stylus/include"],
          compress: true
        }
      }
    },

    yuidoc: {
      compileA: {
        options: {
          paths: "fixtures/yuidoc/app/",
          outdir: "fixtures/output/yuidoca/"
        }
      },
      compileB: {
        options: {
          paths: [
            "fixtures/yuidoc/app/",
            "fixtures/yuidoc/otherapp/"
          ],
          outdir: "fixtures/output/yuidocb/"
        }
      }
    },

    options: {
      jade: {
        filename: "fixtures/jade/inc/"
      }
    }
  });

  grunt.loadTasks("../tasks");
  grunt.registerTask("default", "clean test:clean coffee compress copy jade jst handlebars less mincss requirejs stylus yuidoc test:tasks");
}