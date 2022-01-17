function(root, parsedPath, options) {
    var val,
        path = parsedPath.path;

    if (path === 'this') {
      val = root;
    } else if (path === '') {
      val = true;
    } else {
      val = getPath(root, path, options);
    }

    return Ember.View._classStringForValue(path, val, parsedPath.className, parsedPath.falsyClassName);
  }