function(path) {
      if (options.force === true && grunt.file.exists(path) && isOutsideCWD(path)) {
        grunt.fail.warn('trying to clean "' + path + '" which is outside the working dir.');
      }

      grunt.helper("clean", path);
    }