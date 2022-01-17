function(source, filepath, namespace, templateSettings) {
    try {
      return namespace + "['" + filepath + "'] = " + _.template(source, false, templateSettings).source + ";";
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn("JST failed to compile.");
    }
  }