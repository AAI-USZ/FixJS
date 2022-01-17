function(key, options, cb) {
    if(typeof key !== 'string') return;
      
    if(typeof my.cache[key] !== 'undefined') {
      if(typeof my.cache[key].value !== 'undefined') {
        my.cache[key].date = Date.now();
        // returns the value
        cb(null, my.cache[key].value);
      } 
      else {
        my.cache[key].queue.push(cb);
      }

      // timeout comparison
      if(typeof options.timeout === 'number') {
        var t = Date.now() + options.timeout;
        if(typeof my.cache[key].timeout === 'undefined' ||
           my.cache[key].timeout > t) {
          my.cache[key].timeout = t;
        }
      }
    }
    else if(typeof options.getter === 'function') {
      my.cache[key] = { queue: [cb] };
      // timeout setting
      if(typeof options.timeout === 'number') {
        my.cache[key].timeout = Date.now() + options.timeout;
      }
      // getter asynchonous call
      options.getter(key, function(err, val) {
        if(!err && typeof val === 'undefined') {
          err = new Error('undefined val returned by getter');
        }
        
        var queue = my.cache[key].queue;

        if(!err) {
          my.cache[key].date = Date.now();
          my.cache[key].value = val; 
          delete my.cache[key].queue;
        }
        else {
          delete my.cache[key];
        }    
      
        queue.forEach(function(cb) {
          cb(err, val);
        });
      });
    }
    else {
      cb();
    }
  
    var count = that.count();
    if(count > my.size)
      evict[my.modes[my.evict]](count);
  }