function(key) {
    if(typeof key === "string") {
      if(my.cache[key] && typeof my.cache[key].value !== 'undefined')
        delete my.cache[key];
      return;
    }

    //regex on whole map
    if(typeof key === "object" && key instanceof RegExp) {
      base.forEach(my.cache, function(v, k) {
        if(key.test(k) && typeof my.cache[k].value !== 'undefined') {
          delete my.cache[k]; 
        }
      });
    }
    
    if(typeof key == "undefined") {
      base.forEach(my.cache, function(v, k) {
        if(typeof my.cache[k].value !== 'undefined') {
          delete my.cache[k]; 
        }
      });
    }
  }