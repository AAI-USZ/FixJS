function(css) {
        grunt.file.write(file.dest, css);
        grunt.log.writeln("File '" + file.dest + "' created.");

        next();
      }