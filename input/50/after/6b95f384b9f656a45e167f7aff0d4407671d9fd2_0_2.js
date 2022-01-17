function(err){
        if (err){
          self.error(err, callback);
        } else {
          self.onClose();
          callback && callback();
        }
      }