function(array, other) {
    return _.filter(array, function(value){ return !_.include(other, value); });
  }