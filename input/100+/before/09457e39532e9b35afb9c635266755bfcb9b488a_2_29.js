function lookup(map) {
      map = getKeyMap(map);
      var found = map[name];
      if (found != null && handle(found)) return true;
      if (map.catchall) return handle(map.catchall);
      var fallthrough = map.fallthrough;
      if (fallthrough == null) return false;
      if (Object.prototype.toString.call(fallthrough) != "[object Array]")
        return lookup(fallthrough);
      for (var i = 0, e = fallthrough.length; i < e; ++i) {
        if (lookup(fallthrough[i])) return true;
      }
      return false;
    }