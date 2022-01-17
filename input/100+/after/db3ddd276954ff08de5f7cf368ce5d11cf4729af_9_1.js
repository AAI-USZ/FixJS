function() {
    var options = grunt.helper('options', this);
    var data = this.data;
    var done = this.async();

    grunt.verbose.writeflags(options, "Options");

    async.forEachSeries(Object.keys(data.files), function(dest, next) {
      var src = data.files[dest];
      var srcFiles = grunt.file.expandFiles(src);

      dest = grunt.template.process(dest);

      async.concatSeries(srcFiles, function(srcFile, nextConcat) {
        var stylusOptions = _.extend({filename: srcFile}, options);
        var stylusSource = grunt.file.read(srcFile);

        grunt.helper("stylus", stylusSource, stylusOptions, function(css) {
          nextConcat(css);
        });
      }, function(css) {
        grunt.file.write(dest, css);
        grunt.log.writeln("File '" + dest + "' created.");

        next();
      });
    }, function() {
      done();
    });
  }