function(dest) {
      var src = data.files[dest];
      var srcFiles = grunt.file.expandFiles(src);

      dest = grunt.template.process(dest);

      var jstOutput = [];
      var jstNamespace = "this['" + options.namespace + "']";

      jstOutput.push(jstNamespace + " = " + jstNamespace + " || {};");

      srcFiles.forEach(function(srcFile) {
        var jstSource = grunt.file.read(srcFile);

        jstOutput.push(grunt.helper("jst", jstSource, srcFile, jstNamespace, options.templateSettings));
      });

      if (jstOutput.length > 0) {
        grunt.file.write(dest, jstOutput.join("\n\n"));
        grunt.log.writeln("File '" + dest + "' created.");
      }
    }