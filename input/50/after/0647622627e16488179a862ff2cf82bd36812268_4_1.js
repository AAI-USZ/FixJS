function(fileobj) {
      // Add template (plus its path) to the templates object.
      var basename = path.basename(fileobj.abs).replace(/\.(?:js|coffee)/, '');
      templates[basename] = require(fileobj.abs);
    }