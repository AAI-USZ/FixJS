function(error, status, result) {
        if(error) {
          callback(error);
        }
        else {
          try {
            callback(null, JSON.parse(result).access_token);
          }
          catch(e) {
            callback(e);
          }
        }
      }