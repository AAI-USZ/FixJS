function(err, data) {
        if(!err) {
          cb(data.name, data.avatar);
        }
      }