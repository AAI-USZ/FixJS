function g() {
  var x = 17;
  (1,eval)("'use strict';x = 22;")
  return x === 17;
}