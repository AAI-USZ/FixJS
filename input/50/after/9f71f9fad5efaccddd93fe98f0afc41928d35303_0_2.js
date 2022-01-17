function(v, k) {
        if(typeof my.cache[k].value !== 'undefined') {
          delete my.cache[k]; 
        }
      }