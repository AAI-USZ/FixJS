function (old_obj, old_idx) {
        self.unset(collection, old_obj._id, _.keys(old_obj));
        self.flush();
      }