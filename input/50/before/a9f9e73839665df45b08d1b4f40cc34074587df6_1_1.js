function(previous, source, target) {
      var path;
      path = [];
      while (previous[target]) {
        path.unshift(target);
        target = previous[target];
      }
      return path;
    }