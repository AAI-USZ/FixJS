function () {
  var self = this;

  async.parallel({
    // compile router module
    router: function (callback) {
      self.require('router', function (error, module) {
        if (error) return callback(error, null);
        callback(null, new module());
      });
    },

    // build directory maps
    modules: directory.bind(null, this.get('modules')),
    staticFile: directory.bind(null, this.get('static')),
    presenter: directory.bind(null, this.get('presenter')),

    // build client core
    client: clientBuild.bind(null, self)
  }, function (error, build) {
    if (error) return self.emit('error', error);

    // store build object and emit ready
    self.build = build;
    self.emit('ready');
  });
}