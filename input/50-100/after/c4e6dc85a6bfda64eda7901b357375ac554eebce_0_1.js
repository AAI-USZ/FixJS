function evaluate(code) {
  var exports = {};
  var module = { exports: exports };
  vm.runInNewContext(code, {
    require: require,
    exports: exports,
    module: module,
    console: console,
    global: global,
    process: process,
    Buffer: Buffer,
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    setInterval: setInterval,
    clearInterval: clearInterval
  }, "dynamic-" + Date.now(), true);
  return module.exports;
}