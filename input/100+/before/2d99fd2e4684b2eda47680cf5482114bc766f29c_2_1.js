function inner(o, dir){
      var dir, k, v, p, __own = {}.hasOwnProperty, __results = [];
      dir == null && (dir = '');
      for (k in o) if (__own.call(o, k)) {
        v = o[k];
        p = path.join(dir, k);
        if (v instanceof Function) {
          __results.push(acc[p] = v);
        } else {
          __results.push(inner(v, p, acc));
        }
      }
      return __results;
    }