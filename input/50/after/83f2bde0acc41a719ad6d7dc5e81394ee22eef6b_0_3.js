function(path) {
      return '://' + app.dynamicViewHelpers.host(req, res) + (path || '');
    }