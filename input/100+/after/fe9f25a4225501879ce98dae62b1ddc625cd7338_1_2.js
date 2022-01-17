function () {
  if (!this.loadConfig()) { return false; }
  this.loadOverrides();
  this.initModules();
  builtins(this); // TODO: Make builtins better.

  if (this.config.operators) {
    this.log.debug('Loading operators', this.config.operators);
    this.operators = this.config.operators.map(function (op) {
      return new RegExp(op.replace(/[-[\]{}()+?.,\\^$|#\s]/g, "\\$&").replace(/\*/g, '(.*?)'), 'i'); });
  }
  return true; // Success
}