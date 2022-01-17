function(thisp, k, v) {
        if(typeof my.cache[k].value !== 'undefined') {
          delete my.cache[k]; 
        }
      }