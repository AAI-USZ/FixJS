function evaluate(code) {
  var exports = {};
  var module = { exports: exports };
  (new Function("module", "exports", code))(module, exports);
  return module.exports;
}