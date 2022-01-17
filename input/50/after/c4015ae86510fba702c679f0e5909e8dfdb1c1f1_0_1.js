function (callback) {
      if (this[rstring + '_id']) {
        return rfactory.get(this[rstring + '_id'], callback);
      }
      callback(null, null);
    }