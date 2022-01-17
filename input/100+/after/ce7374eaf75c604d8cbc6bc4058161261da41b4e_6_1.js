function(err, result) {
        if(err && typeof callback === 'function') return callback(err);
        if(typeof waitForMilliseconds === 'function') {
          return callback(new Error('Element ' + waitForMilliseconds + ' is not a valid amount!'));
        }
        if(typeof callback === 'function'){
          var now = new Date().getTime(); 
          if (now - startTimer < waitForMilliseconds) {
            setTimeout(checkElement, 500);
          }else if (typeof callback === "function"){
            callback(null, result);
          }
        }
      }