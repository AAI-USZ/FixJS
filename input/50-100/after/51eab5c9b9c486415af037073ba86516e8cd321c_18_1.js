function(err, result){
      if(err && typeof callback == 'function') return callback(err);    
      if(typeof callback == 'function' && result.value == false){
        return callback(new Error('Element ' + cssSelector + ' not selected' ));
      }
      if (typeof callback === 'function'){
        callback(null, result.value);
      }
    }