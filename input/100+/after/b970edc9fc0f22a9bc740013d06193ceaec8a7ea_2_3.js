function (key) {
      tasks[key] = function (cb) {
        _templates[key].process(params, function (data) {
          cb(null, data);
        });
      };
    }