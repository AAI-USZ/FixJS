function(){
        // Configuration directory, which holds information about certificate, ports, openid details
        fs.readdir ( webinosDemo+"/config", function(err) {
          if ( err && err.code=== "ENOENT" ) {
            fs.mkdirSync( webinosDemo +"/config","0700");
          }
        });
        // logs
        fs.readdir ( webinosDemo+"/logs", function(err) {
          if ( err && err.code=== "ENOENT" ) {
            fs.mkdirSync( webinosDemo +"/logs","0700");
          }
        });
        // keys
        fs.readdir ( webinosDemo+"/keys", function(err) {
          if ( err && err.code=== "ENOENT" ) {
            fs.mkdirSync( webinosDemo +"/keys","0700");
          }
        });
        callback(true);
      }