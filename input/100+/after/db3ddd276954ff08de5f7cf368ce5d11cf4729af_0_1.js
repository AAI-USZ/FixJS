function() {
    var options = grunt.helper("options", this);
    var data = this.data;

    grunt.verbose.writeflags(options, "Options");

    Object.keys(data.files).forEach(function(dest) {
      var src = data.files[dest];
      var srcFiles = grunt.file.expandFiles(src);

      dest = grunt.template.process(dest);

      var coffeeOutput = [];

      srcFiles.forEach(function(srcFile) {
        var coffeeOptions = _.extend({filename: srcFile}, options);
        var coffeeSource = grunt.file.read(srcFile);

        coffeeOutput.push(grunt.helper("coffee", coffeeSource, coffeeOptions));
      });

      if (coffeeOutput.length > 0) {
        grunt.file.write(dest, coffeeOutput.join("\n"));
        grunt.log.writeln("File '" + dest + "' created.");
      }
    });
  }