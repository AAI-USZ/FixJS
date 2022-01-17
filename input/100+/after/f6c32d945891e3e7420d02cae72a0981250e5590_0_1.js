function(err, src) {
    if (err) return fn(err);
    try {
      var names = getRefNames(src);
      var refs = {};
      var ready = [];
      if (names.length > 0) {
        collectRefs(names, refs, function(tmplName) {
          ready.push(tmplName);
          if (names.length === ready.length)
            compile(src, refs);
        });
      } else {
        compile(src, refs);
      }
    } catch (err) {
      fn(err);
    }
  }