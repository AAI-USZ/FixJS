function(target, obj) {
    var extendedObj = {};

    for (var key in target) {
      if (target.hasOwnProperty(key)) {
        extendedObj[key] = target[key];
      }
    }

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        extendedObj[key] = obj[key];
      }
    }

    return extendedObj;
  }