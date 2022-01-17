function(err, resolved_deps) {
      var dep, file, funcs, _i, _len;
      if (err) {
        doneProcessingNode(err);
        return;
      }
      funcs = [];
      for (_i = 0, _len = resolved_deps.length; _i < _len; _i++) {
        dep = resolved_deps[_i];
        file = cached_files[dep.path];
        if (seen[file.path] != null) {
          continue;
        }
        seen[file.path] = true;
        funcs.push(async.apply(processNode, file));
      }
      return async.parallel(funcs, function(err, results) {
        files.push(node);
        if (err) {
          doneProcessingNode(err);
          return;
        }
        return doneProcessingNode(null);
      });
    }