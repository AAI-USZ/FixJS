function(filename) {
      // Filter out non-.js files.
      return path.extname(filename).toLowerCase() === '.js';
    }