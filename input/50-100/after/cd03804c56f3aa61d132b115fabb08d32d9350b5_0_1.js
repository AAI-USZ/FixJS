function() {
    var dest = this.file.dest,
        options = this.data.options,
        extension = this.data.extension;

    grunt.file.expandFiles(this.file.src).forEach(function(filepath) {
      grunt.helper('coffee', filepath, dest, grunt.utils._.clone(options), extension);
    });

    if (grunt.task.current.errorCount) {
      return false;
    }
  }