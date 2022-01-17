function(v, k) {
        if(key.test(k) && typeof my.cache[k].value !== 'undefined') {
          delete my.cache[k]; 
        }
      }