function _process(templates, params, cb) {
  var tasks = {},
    _templates = _.extend(templates, {});

  _.keys(_templates).forEach(function (key) {
    tasks[key] = function (cb) {
      // _templates[key] is a jazz compiled template
      _templates[key].process(params, function (data) {
        cb(null, data);
      });
    };
  });

  async.parallel(tasks, function (err, results) {
    cb(results);
  });
}