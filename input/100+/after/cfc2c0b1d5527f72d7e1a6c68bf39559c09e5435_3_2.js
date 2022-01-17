function() {
    var options = grunt.helper("options", this, {
      mode: null,
      basePath: null,
      flatten: false,
      level: 1
    });

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || grunt.helper("normalizeMultiTaskFiles", this.data, this.target);

    var supported = ["zip", "tar", "tgz", "gzip"];
    var helper = options.mode + "Helper";
    var done = this.async();

    if (options.basePath !== null) {
      options.basePath = path.normalize(options.basePath);
      options.basePath = _(options.basePath).trim(path.sep);
    }

    grunt.verbose.writeflags(options, "Options");

    if (options.mode === "tgz") {
      helper = "tarHelper";
    }

    if (_.include(supported, options.mode) === false) {
      grunt.log.error("Mode " + options.mode + " not supported.");
      done();
      return;
    }

    var srcFiles;
    var destDir;

    async.forEachSeries(this.files, function(file, next) {
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

    }, function() {
      done();
    });
  }