function(previous, source, target) {
      var path;
      path = [];
      while (previous[target]) {
        path.unshift(this._idMap[target]);
        target = previous[target];
      }
      return path;
    }