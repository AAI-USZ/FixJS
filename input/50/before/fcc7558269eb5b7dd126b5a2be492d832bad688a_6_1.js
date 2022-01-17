function g(x) {
  eval("var x = 22;");
  return x === 17;
}