function(path, parent, result) {
      var child, module, resolvedPath, stat, _i, _len, _ref;
      if (parent == null) parent = path;
      if (result == null) result = [];
      resolvedPath = npath.resolve(path);
      if (!nfs.existsSync(resolvedPath)) {
        this.logger.warn("Skipping " + path + ", not found");
        return [];
      }
      stat = fs.statSync(resolvedPath);
      if (stat.isDirectory()) {
        _ref = fs.readdirSync(resolvedPath);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          child = npath.join(resolvedPath, child);
          this.walk(child, resolvedPath, result);
        }
      } else {
        if (path === parent) parent = npath.dirname(resolvedPath);
        module = new Module(path, resolvedPath, parent);
        if (module.valid()) result.push(module);
      }
      return result;
    }