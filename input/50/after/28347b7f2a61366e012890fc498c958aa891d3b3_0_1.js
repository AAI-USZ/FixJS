function(object, prop, options) {
    if (!(object && object[prop])) return null;
    return _.isFunction(object[prop]) ? object[prop](options) : object[prop];
  }