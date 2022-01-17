function() {
    var target = get(this, 'target');

    if (Ember.typeOf(target) === "string") {
      var value = get(this, target);
      if (value === undefined) { value = get(window, target); }
      return value;
    } else {
      return target;
    }
  }