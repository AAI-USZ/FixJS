function testRe(re, string) {
    return RegExp.prototype.test.call(re, string);
  }