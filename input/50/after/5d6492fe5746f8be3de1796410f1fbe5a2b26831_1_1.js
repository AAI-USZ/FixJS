function (options) {
  var worker = this.worker;

  worker.registerCompiler(".json", module.exports);
}