function(count) {
    while(count > my.size ) {
      var min = Date.now();
      var evct;
      for(var s in my.cache) {
        if(my.cache.hasOwnProperty(s)) {
          if(my.cache[s].dte < min) {
            min = my.cache[s].dte;
            evct = s;
          }
        }
      }
      count--;
      invalidate(evct);
    }
  }