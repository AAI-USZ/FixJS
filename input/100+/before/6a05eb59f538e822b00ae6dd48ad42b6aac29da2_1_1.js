function Path(options) {
  this.type = options.type;
  this.path = options.path;
  this.explicitCompiler = options.compiler;

  // relative/absolute paths
  if (/^([\.\/]|node_modules)/.test(this.path)) {
    this.path = withAutoSuffix(pathLib.resolve(this.path));
    this.relativePath = "./" + pathLib.relative(process.cwd(), this.path);
  }
  // node modules
  else {
    this.isNodeModule = true;
    this.relativePath = this.path;
  }
}