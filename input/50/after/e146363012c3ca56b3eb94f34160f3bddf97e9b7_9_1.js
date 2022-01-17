function(err, videoInfo) {
        if (err || !videoInfo) {
          return callback(err, null);  
        }
     
        return callback(null, videoInfo.getThumbUrl());
      }