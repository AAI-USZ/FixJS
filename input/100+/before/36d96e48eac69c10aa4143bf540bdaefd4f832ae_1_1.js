function (action) {
  var func = function () {
    var self = this
      , app = application;

    this.arguments = arguments;

    utile.async.forEachSeries(
      controllersBefore[action[0]][action[1]], function (exec, callback) {
        if (exec.indexOf('/') > 0) {
          exec = exec.split('/');
        } else {
          exec = [action[0], exec];
        }

        if (app.c[exec[0]][exec[1]]) {
          app.c[exec[0]][exec[1]].apply(self, [callback].concat(self.arguments));
        } else {
          callback();
        }
      }, function (err) {
        app.c[action[0]][action[1]].apply(self, self.arguments);
      }
    );
  };

  func.stream = true;
  return func;
}