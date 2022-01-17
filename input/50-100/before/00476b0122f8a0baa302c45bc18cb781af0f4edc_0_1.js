function iterateOverObject(obj, fn) {
    var key;
    for(key in obj) {
      if(!hasOwnProperty(obj, key)) continue;
      fn.call(obj, key, obj[key]);
    }
  }