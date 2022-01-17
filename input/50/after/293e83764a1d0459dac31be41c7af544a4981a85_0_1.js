function(key) {
    if(my.cache[key]) {
      delete my.cache[key];
    } else if(typeof key == "undefined") {
      my.cache = {};
    }
  }