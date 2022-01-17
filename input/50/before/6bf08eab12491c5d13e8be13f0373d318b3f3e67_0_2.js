function(key) {
    var val = getPath(this, dependentKey);
    return val === undefined || val === null || val === '' || (Ember.isArray(val) && get(val, 'length') === 0);
  }