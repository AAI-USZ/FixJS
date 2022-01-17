function copy(obj) {
      var newObj = {};
      for (var prop in obj) if (obj.hasOwnProperty(prop)) {
        newObj[prop] = obj[prop]
      }
      return newObj;
    }