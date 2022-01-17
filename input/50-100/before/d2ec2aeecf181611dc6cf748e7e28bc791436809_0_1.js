function(err,msg) {
        if (err) {
          that.emit('error',err);
        } else if (msg) {
          that.emit('message',msg[0], function() {
            that.del(msg[0]);
          });
        }        
      }