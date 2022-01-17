function(path) {
      if (options.force === true && existsSync(path) && isOutsideCWD(path)) {
        grunt.fail.warn('trying to clean "' + path + '" which is outside the working dir.');
      }

      grunt.helper("clean", path);
    }