function(dest) {
      var src = data.files[dest];
      var srcFiles = grunt.file.expandFiles(src);

      dest = grunt.template.process(dest);
      dest = _(dest).trim("/");

      if (require("path").existsSync(dest) === false) {
        grunt.file.mkdir(dest);
      }

      var count = 0;

      srcFiles.forEach(function(srcFile) {
        var filename = _(srcFile).strRightBack("/");
        var relative = _(srcFile).strLeftBack("/");

        if (relative === filename) {
          relative = "";
        }

        if (options.basePath !== null && options.basePath.length > 1) {
          relative = _(relative).strRightBack(options.basePath);
          relative = _(relative).trim("/");
        }

        if (options.stripString !== null) {
          filename = filename.replace(options.stripString, "");
        }

        // handle paths outside of grunts working dir
        relative = relative.replace(/\.\.\//g, "");

        if (relative.length > 0) {
          relative = relative + "/";
        }

        grunt.file.copy(srcFile, dest + "/" + relative + filename, copyOptions);

        count++;
      });

      grunt.log.writeln("Copied " + count + ' file(s) to "' + dest + '".');
    }