function Path(options) {
  this.type = options.type;
  this.path = options.path;
  this.isCss = options.isCss;
  //make win path uniform with linux form (c:\\qsdf\\qsdf => c:/qsdf/qsdf)
  if (process.platform === "win32") {
    this.path = this.path.replace(/\\/g, '/');
  }  
  this.explicitCompiler = options.compiler;

  // relative/absolute paths
  // .|node_modules => relative
  // / => absolute on linux
  // c: => absolute on win (@todo: should maybe accept unc form \\server\path ??)
  if (/^([\.\/]|[a-z]:|node_modules)/.test(this.path)) {
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
  //still need to transform win path :(
  if (process.platform === "win32") {
    this.relativePath = this.relativePath.replace(/\\/g, '/');
  }  
}