function (err, data) {
        if (err) {
          return callback(err, null);  
        }
        
        return callback(null, data.thumb);  
      }