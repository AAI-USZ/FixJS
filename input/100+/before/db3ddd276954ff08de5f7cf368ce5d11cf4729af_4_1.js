function() {
    var path = require("path");

    var options = grunt.helper("options", this);
    var data = this.data;
    var jadeData = options.data;

    if (_.isEmpty(jadeData) === false) {
      _.each(jadeData, function(value, key) {
        if (_.isString(value)) {
          jadeData[key] = grunt.template.process(value);
        }
      });
    }

    Object.keys(data.files).forEach(function(dest) {
      var src = data.files[dest];
      var srcFiles = grunt.file.expandFiles(src);

      dest = grunt.template.process(dest);

      var jadeOutput = [];

      srcFiles.forEach(function(srcFile) {
        var jadeOptions = _.extend({filename: srcFile}, options);
        var jadeSource = grunt.file.read(srcFile);

        jadeOutput.push(grunt.helper("jade", jadeSource, jadeOptions, jadeData));
      });

      if (jadeOutput.length > 0) {
        grunt.file.write(dest, jadeOutput.join("\n"));
        grunt.log.writeln("File '" + dest + "' created.");
      }
    });
  }