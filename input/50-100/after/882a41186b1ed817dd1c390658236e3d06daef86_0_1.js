function put(obj, flag) {
      var storage = _selectStorage(flag);

      if (typeof obj === 'object') {
        if (obj instanceof Array) {
          throw new Error('1st argument should be object');
        }
        for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
            storage.setItem(i, JSON.stringify(obj[i]));
          }
        }
      } else {
        throw new Error('1st argument should be object');
      }
    }