function(err, rows) {

      if(err && err.code != "ResourceNotFound") {
          console.log(err);
          callback(err);
      } else {
          if(rows) {
              callback(null, JSON.parse(rows[0].data));
          } else {
              callback(null);
          }
      }

    }