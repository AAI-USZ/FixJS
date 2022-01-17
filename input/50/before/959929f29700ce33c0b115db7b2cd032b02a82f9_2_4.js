function(value, index) {
      var key = iterator(value, index);
      (result[key] || (result[key] = [])).push(value);
    }