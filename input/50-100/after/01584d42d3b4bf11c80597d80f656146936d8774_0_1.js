function(key, flag) {
      var storage = _selectStorage(flag),
          selectKey = storage.getItem(key);

      if (typeof key !== 'string') {
        throw new Error('1st argument should be strings');
      } else {
        if (selectKey) {
          return true;
        } else {
          return false;
        }
      }
    }