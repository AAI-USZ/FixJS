function(type, bounds) {
    var result = null;
    if (typeof bounds[0] === 'number') {
      var itemsCount = 0 | bounds[0];
      if (bounds.length <= 1) {
        result = [];
        result.length = itemsCount;
        for (var i = 0; i < itemsCount; ++i) {
          result[i] = 0;
        }
      } else {
        result = [];
        var newBounds = bounds.slice(1);
        for (var j = 0; j < itemsCount; ++j) {
          result.push(defaultScope.createJavaArray(type, newBounds));
        }
      }
    }
    return result;
  }