function() {
    var options = grunt.helper("options", this, {mode: null, basePath: null, level: 1});
    var supported = ["zip", "tar", "tgz", "gzip"];
    var helper = options.mode + "Helper";
    var data = this.data;
    var done = this.async();

    if (options.basePath !== null) {
      options.basePath = _(options.basePath).rtrim("/");
    }

    if (options.mode == 'tgz') {
      helper = "tarHelper";
    }

    if (_.include(supported, options.mode) === false) {
      grunt.log.error("Mode " + options.mode + " not supported.");
      done();
      return;
    }

    async.forEachSeries(Object.keys(data.files), function(dest, next) {
      var src = data.files[dest];
      dest = grunt.template.process(dest);

      if (_.isArray(src)) {
        src.forEach(function(s, k) {
          src[k] = grunt.template.process(s);
        });
      } else {
        src = grunt.template.process(src);
      }

      var srcFiles = grunt.file.expandFiles(src);

      if (options.mode == 'gzip' && srcFiles.length > 1) {
        grunt.warn("Cannot specify multiple input files for gzip compression.");
        srcFiles = srcFiles[0];
      }

      grunt.helper(helper, srcFiles, dest, options, function(written) {
        grunt.log.writeln('File "' + dest + '" created (' + written + ' bytes written).');

        next();
      });

    }, function() {
      done();
    });
  }