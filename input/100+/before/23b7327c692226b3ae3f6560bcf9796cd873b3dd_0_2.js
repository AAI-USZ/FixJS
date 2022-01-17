function(count) {
    while(count > my.size) {
      var max = 0;
      var evct;
      for(var s in my.cache) {
        if(my.cache.hasOwnProperty(s)) {
          if(my.cache[s].dte > max) {
            max = my.cache[s].dte;
            evct = s;
          }
        }
      }
      count--;
      invalidate(evct);
    }
  }