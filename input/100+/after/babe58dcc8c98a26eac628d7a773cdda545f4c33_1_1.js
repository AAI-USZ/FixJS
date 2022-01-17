function Path(options) {
  this.type = options.type;
  this.path = options.path;
  this.explicitCompiler = options.compiler;

  // relative/absolute paths
  if (/^([\.\/]|node_modules)/.test(this.path)) {
    this.path = withAutoSuffix(pathLib.resolve(this.path));
    this.relativePath = "./" + pathLib.relative(process.cwd(), this.path);
  }
  // node modules or relative path
  else {
    try {
      // will throw if file is not found, meaning it's a module
      this.path = withAutoSuffix("./" + this.path);
      this.relativePath = "./" + pathLib.relative(process.cwd(), this.path);
    }
    catch (e) {
      this.isNodeModule = true;
      this.relativePath = this.path;
    }
  }
}