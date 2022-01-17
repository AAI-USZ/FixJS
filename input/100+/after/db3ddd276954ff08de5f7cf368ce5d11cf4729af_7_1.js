function() {
    var options = grunt.helper("options", this);
    var data = this.data;

    grunt.verbose.writeflags(options, "Options");

    Object.keys(data.files).forEach(function(dest) {
      var src = data.files[dest];
      var srcFiles = grunt.file.expandFiles(src);
      var source = grunt.helper("concat", srcFiles);

      dest = grunt.template.process(dest);

      var min = grunt.helper("mincss", source);

      if (min.length > 0) {
        grunt.file.write(dest, min);
        grunt.log.writeln("File '" + dest + "' created.");
        grunt.helper('min_max_info', min, source);
      }
    });
  }