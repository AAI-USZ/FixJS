function() {
    var options = grunt.helper("options", this, {namespace: "JST"});

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || grunt.helper("normalizeMultiTaskFiles", this.data, this.target);

    grunt.verbose.writeflags(options, "Options");

    this.files.forEach(function(file) {
      var srcFiles = grunt.file.expandFiles(file.src);

      var handlebarOutput = [];
      var handlebarNamespace = "this['" + options.namespace + "']";

      handlebarOutput.push(handlebarNamespace + " = " + handlebarNamespace + " || {};");

      srcFiles.forEach(function(srcFile) {
        var handlebarSource = grunt.file.read(srcFile);

        handlebarOutput.push(grunt.helper("handlebars", handlebarSource, srcFile, handlebarNamespace));
      });

      if (handlebarOutput.length > 0) {
        grunt.file.write(file.dest, handlebarOutput.join("\n\n"));
        grunt.log.writeln("File '" + file.dest + "' created.");
      }
    });
  }