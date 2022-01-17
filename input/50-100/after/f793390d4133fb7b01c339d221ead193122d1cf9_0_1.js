function(err, dbname) {
          if ( err ) callback(err, null);
          else if ( dbname === null ) {
            callback(new Error("missing " + username + "'s dbname in redis (try CARTODB/script/restore_redis)"), null);
          }
          else callback(err, dbname);
        }