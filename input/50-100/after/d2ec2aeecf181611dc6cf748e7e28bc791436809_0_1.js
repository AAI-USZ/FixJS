function(err, msg, done) {
        if (err) {
          that.emit('error',err);
        } else if (msg) {
          that.emit('message',msg, done);
        }        
      }