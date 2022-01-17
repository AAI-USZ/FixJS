function resolveNodeModule(p, name) {
  var resolved = path.resolve(p + '/node_modules', name);
  if (fs.existsSync(resolved)) {
    return resolved;
  }
  var dir = path.dirname(p);
  if (dir.length > 1) {
    return resolveNodeModule(dir, name);
  }
  return null;
}