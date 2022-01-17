function () {
  // Init ALL THE THINGS.
  this.loadConfig();
  this.loadOverrides();
  this.initModules();
  this.initHelp();

  if (this.config.operators) {
    this.operators = this.config.operators.map(function (op) {
      return new RegExp(op.replace(/[-[\]{}()+?.,\\^$|#\s]/g, "\\$&").replace(/\*/g, '(.+?)'));
    });
  }
}