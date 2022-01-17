function(object, property) {
    var value;
    if (!object) return null;
    value = object[property];
    if (_.isFunction(value)) {
      return value.call(object);
    } else {
      return value;
    }
  }