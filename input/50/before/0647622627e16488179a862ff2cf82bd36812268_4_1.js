function(fileobj) {
      // Add template (plus its path) to the templates object.
      templates[path.basename(fileobj.abs, '.js')] = require(fileobj.abs);
    }