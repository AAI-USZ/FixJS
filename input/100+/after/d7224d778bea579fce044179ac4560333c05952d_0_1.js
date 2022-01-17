function(e, res) {
      if (res) {
        instance._id  = instance._id  || res.id;
        instance._rev = instance._rev || res.rev;
      }

      that.runAfterHooks("create", null, res, function(e) {
        if(e) {
          return that.emit("error", e);
        }

        if(callback) callback(e, res);
      });
    }