function(property) {
    var parsedPath = Ember.View._parsePropertyPath(property);
    var path = parsedPath.path;

    var val = get(this, path);
    if (val === undefined && Ember.isGlobalPath(path)) {
      val = get(window, path);
    }

    return Ember.View._classStringForValue(path, val, parsedPath.className, parsedPath.falsyClassName);
  }