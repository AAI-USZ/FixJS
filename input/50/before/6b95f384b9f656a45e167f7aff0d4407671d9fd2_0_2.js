function(err){
        if (err){
          callback(err);
        } else {
          self.onClose();
          callback(null);
        }
      }