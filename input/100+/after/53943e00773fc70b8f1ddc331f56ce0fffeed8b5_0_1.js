function(dest) {
      var src = data.files[dest];
      var srcFiles = grunt.file.expandFiles(src);

      dest = grunt.template.process(dest);
      dest = _(dest).trim("/");

      if (path.existsSync(dest) === false) {
        grunt.file.mkdir(dest);
      }

      var count = 0;

      var filename = "";
      var relative = "";

      var destFile = "";

      srcFiles.forEach(function(srcFile) {
        filename = path.basename(srcFile);
        relative = path.dirname(srcFile);

        if (options.basePath !== null && options.basePath.length > 1) {
          relative = _(relative).strRightBack(options.basePath);
          relative = _(relative).trim("/");
        }

        if (options.processName && kindOf(options.processName) === "function") {
          filename = options.processName(filename);
        }

        // make paths outside grunts working dir relative
        relative = relative.replace(/\.\.\//g, "");

        destFile = path.join(dest, relative, filename);

        grunt.file.copy(srcFile, destFile, copyOptions);

        count++;
      });

      grunt.log.writeln("Copied " + count + ' file(s) to "' + dest + '".');
    }