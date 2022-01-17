function() {
    var parentPath = get(this, 'parentState.path'),
        path = get(this, 'name');

    if (parentPath) {
      path = parentPath + '.' + path;
    }

    return path;
  }