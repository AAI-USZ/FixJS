function(root, path, options) {
  var data = options && options.data,
      normalizedPath = normalizePath(root, path, data),
      value;

  // In cases where the path begins with a keyword, change the
  // root to the value represented by that keyword, and ensure
  // the path is relative to it.
  root = normalizedPath.root;
  path = normalizedPath.path;

  value = Ember.get(root, path);

  if (value === undefined && root !== window && Ember.isGlobalPath(path)) {
    value = Ember.get(window, path);
  }
  return value;
}