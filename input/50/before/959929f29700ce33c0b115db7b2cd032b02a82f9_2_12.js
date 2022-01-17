function(obj) {
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  }