function (dir) {
  this.removeSubClassMethods();
  if (envCheck()) {
    o.domains.npm = path.resolve(dir);
    if (!path.existsSync(o.domains.npm)) {
      error('could not resolve the npm path - ' + o.domains.npm + ' does not exist');
    }
  }
  return this;
}