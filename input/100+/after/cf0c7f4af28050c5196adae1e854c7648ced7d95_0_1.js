function (obj, old_idx, old_obj) {
        if (obj && ('_meteorRawData' in obj))
          obj = obj._meteorRawData();
        if (old_obj && ('_meteorRawData' in old_obj))
          old_obj = old_obj._meteorRawData();
      
        var set = {};
        _.each(obj, function (v, k) {
          if (!_.isEqual(v, old_obj[k]))
            set[k] = v;
        });
        self.set(collection, obj._id, set);
        var dead_keys = _.difference(_.keys(old_obj), _.keys(obj));
        self.unset(collection, obj._id, dead_keys);
        self.flush();
      }