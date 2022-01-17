function(dir) {
    var parent;
    if (path.existsSync(path.join(dir, 'Cakefile'))) return dir;
    parent = path.normalize(path.join(dir, '..'));
    if (parent !== dir) return cakefileDirectory(parent);
    throw new Error("Cakefile not found in " + (process.cwd()));
  }