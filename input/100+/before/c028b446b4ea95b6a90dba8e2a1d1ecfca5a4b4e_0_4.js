function() {
    var now = Date.now();
    var expired = [];
    for(var s in my.cache) {
      if(my.cache.hasOwnProperty(s)) {
        if(typeof my.cache[s].timeout == "undefined" ||
           typeof my.cache[s].value == "undefined") 
          continue;
        
        if(now > my.cache[s].timeout) {
          expired.push(s);
        }
      }
    }
    
    for(var i = 0; i < expired.length; i ++) {
      invalidate(expired[i].key);
    }
  }