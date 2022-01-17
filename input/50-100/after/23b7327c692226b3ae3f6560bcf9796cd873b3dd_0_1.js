function(count) {
    while(count > my.size) {
      var index = Math.floor(count * Math.random());
      var evct;
      for(var s in my.cache) {
        if(my.cache.hasOwnProperty(s)) {
          if(typeof mycache[s].value !== 'undefined') {
            if(count == index) 
              evct = s;
          }
        }
      }
      count--;
      if(typeof evct !== 'undefined')
        invalidate(evct);
    }
  }