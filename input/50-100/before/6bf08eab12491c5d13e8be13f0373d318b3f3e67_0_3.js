function() {
    var target = get(this, 'target');

    if (Ember.typeOf(target) === "string") {
      var value = getPath(this, target);
      if (value === undefined) { value = getPath(window, target); }
      return value;
    } else {
      return target;
    }
  }