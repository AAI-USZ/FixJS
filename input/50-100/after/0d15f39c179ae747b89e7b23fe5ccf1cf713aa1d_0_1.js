function(expected) {
  var actual;
  if (this.args.length) {
    actual = this.subject.apply(null, this.args);
  } else {
    actual = this.subject;
  }
  return _eq(expected, actual);
}