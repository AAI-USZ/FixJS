function(obj, id) {
      if (!(obj instanceof Calendar.Models.Account)) {
        obj = new Calendar.Models.Account(obj);
        obj.connect();
      }

      if (typeof(id) !== 'undefined') {
        obj._id = id;
      }

      return obj;
    }