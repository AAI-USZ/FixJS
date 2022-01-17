function evaluate (id, str) {
  var r;
  try {
    r = evalcx(str, this.context, "repl");
  } catch (e) {
    r = undefined;
    this.output(e.stack);
  }
  this.sendResult(id, r === undefined ? [] : [util.inspect(r)]);
}