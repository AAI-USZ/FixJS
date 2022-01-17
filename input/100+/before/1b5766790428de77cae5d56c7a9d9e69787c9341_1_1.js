function testGlobalLeak(desc, that) {
    if (that === void 0) { return false; }
    if (that === global) { return true; }
    if ({}.toString.call(that) === '[object Window]') { return true; }
    return desc + ' leaked as: ' + that;
  }