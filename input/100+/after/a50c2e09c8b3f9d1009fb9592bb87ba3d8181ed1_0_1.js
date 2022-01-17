function evaluate (id, str) {
  var r;
  try {
    var domn = require('domain').create(), self = this;
    domn.on('error', function(e) {
      r = undefined;
      self.output(e.stack);
    });
    domn.run(function () {
      r = evalcx(str, self.context, "repl");
    });
    // r = evalcx(str, this.context, "repl");
  } catch (e) {
    r = undefined;
    this.output(e.stack);
  }
  this.sendResult(id, r === undefined ? [] : [util.inspect(r)]);
}