function remove(key, interceptor) {
    var arr = interceptors[key];
    if (arr) {
      arr.splice(arr.indexOf(interceptor), 1);
      if (arr.length === 0) { console.log('deleting interceptor for ', key); delete interceptors[key]; }
    }
  }