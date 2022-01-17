function(key) {
    if(typeof key === "string") {
      if(my.cache[key])
        delete my.cache[key];
      return;
    }

    //regex on whole map
    if(typeof key === "object" && key instanceof RegExp) {
      base.forEach(my.cache, function(thisp, k, v) {
        if(key.test(k)) {
          delete my.cache[k]; 
        }
      });
    }
    
    if(typeof key == "undefined") {
      my.cache = {};
    }
  }