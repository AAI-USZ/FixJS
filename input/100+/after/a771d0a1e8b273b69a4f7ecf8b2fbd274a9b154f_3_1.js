function() {
    var options = this.options();

    grunt.verbose.writeflags(options, "Options");

    this.files.forEach(function(file) {
      var srcFiles = grunt.file.expandFiles(file.src);
      var source = grunt.helper("concat", srcFiles);

      var min = grunt.helper("mincss", source);

      if (min.length > 0) {
        grunt.file.write(file.dest, min);
        grunt.log.writeln("File '" + file.dest + "' created.");
        grunt.helper('min_max_info', min, source);
      }
    });
  }