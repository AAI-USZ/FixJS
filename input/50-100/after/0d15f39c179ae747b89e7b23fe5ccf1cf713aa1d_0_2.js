function(expected) {
  var actual;
  if (this.args.length) {
    actual = this.subject.apply(null, this.args);
  } else {
    actual = this.subject;
  }
  var r = _eq(expected, actual);
  r.success = !r.success;
  return r;
}