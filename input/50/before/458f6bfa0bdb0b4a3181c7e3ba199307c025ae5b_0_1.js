function resolve(p, name) {
  var resolved = path.resolve(p, name);
  if (path.existsSync(resolved)) {
    return resolved;
  }
  return resolveNodeModule(path.resolve(p), name);
}