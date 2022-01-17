function(error, status, result) {
        if(error) {
          callback(error);
        }
        else {
          try {
            var resultObj = JSON.parse(result);
            if(resultObj.error) {
              callback({message: esultObj.error});
            }
            else if(!resultObj.access_token) {
              callback({message: 'access_token not present, got ' + result});
            }
            else {
              callback(null, resultObj.access_token);
            }              
          }
          catch(e) {
            callback(e);
          }
        }
      }