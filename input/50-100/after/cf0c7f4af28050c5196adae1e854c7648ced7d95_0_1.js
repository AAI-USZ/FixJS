function (old_obj, old_idx) {
        if (old_obj && ('_meteorRawData' in old_obj))
          old_obj = old_obj._meteorRawData();
        
        self.unset(collection, old_obj._id, _.keys(old_obj));
        self.flush();
      }