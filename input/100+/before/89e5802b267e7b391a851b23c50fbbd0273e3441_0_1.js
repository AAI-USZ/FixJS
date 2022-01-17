function (error, build) {
    if (error) return self.emit('error', error);

    // store build object and emit ready
    self.build = build;

    // create Module constructor
    self.build.Module = compileModule(this);

    // create Main module
    var main = self.build.main = this.build.Module('module.js');

    // compile router module
    var router = main.require('router');
    self.build.router = new router();

    // emit ready event
    self.emit('ready');
  }