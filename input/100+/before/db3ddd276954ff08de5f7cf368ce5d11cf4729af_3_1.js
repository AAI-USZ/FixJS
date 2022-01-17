function(dest) {
      var src = data.files[dest];
      var srcFiles = grunt.file.expandFiles(src);

      dest = grunt.template.process(dest);

      var handlebarOutput = [];
      var handlebarNamespace = "this['" + options.namespace + "']";

      handlebarOutput.push(handlebarNamespace + " = " + handlebarNamespace + " || {};");

      srcFiles.forEach(function(srcFile) {
        var handlebarSource = grunt.file.read(srcFile);

        handlebarOutput.push(grunt.helper("handlebars", handlebarSource, srcFile, handlebarNamespace));
      });

      if (handlebarOutput.length > 0) {
        grunt.file.write(dest, handlebarOutput.join("\n\n"));
        grunt.log.writeln("File '" + dest + "' created.");
      }
    }