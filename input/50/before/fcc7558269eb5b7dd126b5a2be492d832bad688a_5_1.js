function g() {
  var x = 17;
  eval("x = 22;")
  return x === 17;
}