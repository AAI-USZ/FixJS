function(file) {
        grunt.file.copy(file, targetConfig.dest+'/'+file.replace(basePath,""));
      }