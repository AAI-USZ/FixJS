function addPaths(base, modules) {
    for (var i = 0, l = modules.length; i < l; i++) {
      var module = modules[i];
      var pos = module.indexOf("/");
      if (pos > 0) {
        var local = module.substr(pos);
        module = module.substr(0, pos);
      }
      var packagePath = resolvePackage(base, module);
      var config = require(packagePath);
      module = config.name;
      var newBase = path.dirname(packagePath);
      if (local) {
        var localPath = path.join(newBase, local + ".js");

        if (!path.existsSync(localPath)) throw new Error("Missing file " + localPath);
        files[module + local] = localPath;
        continue;
      }
      if (config.main) {
        files[module] = path.resolve(newBase, config.main);
      }
      if (config.dependencies) {
        addPaths(newBase, Object.keys(config.dependencies));
      }
    }
  }