function(path) {
      changes.push({ type: 'delete', before: { path: path, sha1: ls1.byPath[path] }, after: { } });
    }