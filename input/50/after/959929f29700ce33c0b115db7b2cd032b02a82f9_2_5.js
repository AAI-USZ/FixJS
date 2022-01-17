function(obj) {
    return _.isArray(obj) ? obj.length : _.keys(obj).length;
  }