function(file, next) {
      srcFiles = grunt.file.expandFiles(file.src);
      destDir = path.dirname(file.dest);

      if (options.mode === "gzip" && srcFiles.length > 1) {
        grunt.fail.warn("Cannot specify multiple input files for gzip compression.");
        srcFiles = srcFiles[0];
      }

      if (grunt.file.exists(destDir) === false) {
        grunt.file.mkdir(destDir);
      }

      grunt.helper(helper, srcFiles, file.dest, options, function(written) {
        grunt.log.writeln('File "' + file.dest + '" created (' + written + ' bytes written).');
        next();
      });

    }