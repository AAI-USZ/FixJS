function remove(key, interceptor) {
    var arr = interceptors[key];
    if (arr) {
      arr.splice(arr.indexOf(interceptor), 1);
      if (arr.length === 0) { delete interceptors[key]; }
    }
  }