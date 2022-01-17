function (options) {
  var compilerOptions = utile.mixin({}, options);
  var compiler = new JsonCompiler(compilerOptions);

  var worker = this.worker;
  worker.registerCompiler(".json", compiler);
}