function (cb) {
      // _templates[key] is a jazz compiled template
      _templates[key].process(params, function (data) {
        cb(null, data);
      });
    }