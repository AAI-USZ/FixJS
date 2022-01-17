function(src, destPath, options) {
    var coffee = require('coffee-script'),
        js = '';

    var dest = path.join(destPath,
                         path.basename(src, '.coffee') + '.js');

    options = options || {};
    if( options.bare !== false ) {
      options.bare = true;
    }

    try {
      js = coffee.compile(grunt.file.read(src), options);
    } catch (e) {
      grunt.log.error(e);
    }
    if (this.errorCount) { return false; }
    grunt.file.write(dest, js);
  }