function(count) {
    while(count > my.size) {
      var max = 0;
      var evct;
      for(var s in my.cache) {
        if(my.cache.hasOwnProperty(s)) {
          if(typeof mycache[s].value !== 'undefined') {
            if(my.cache[s].dte > max) {
              max = my.cache[s].dte;
              evct = s;
            }
          }
        }
      }
      count--;
      if(typeof evct !== 'undefined')
        invalidate(evct);
    }
  }