function(root, path, value, tolerant) {
  var keyName;

  if (typeof root === 'string') {
    Ember.assert("Path '" + root + "' must be global if no root is given.", IS_GLOBAL.test(root));
    value = path;
    path = root;
    root = null;
  }

  if (path.indexOf('.') > 0) {
    // get the last part of the path
    keyName = path.slice(path.lastIndexOf('.') + 1);

    // get the first part of the part
    path    = path.slice(0, path.length-(keyName.length+1));

    // unless the path is this, look up the first part to
    // get the root
    if (path !== 'this') {
      root = Ember.getPath(root, path);
    }
  } else {
    Ember.assert("A global path passed to setPath must have at least one period", !IS_GLOBAL.test(path) || path.indexOf(".") > -1);
    keyName = path;
  }

  if (!keyName || keyName.length === 0) {
    throw new Error('You passed an empty path');
  }

  if (!root) {
    if (tolerant) { return; }
    else { throw new Error('Object in path '+path+' could not be found or was destroyed.'); }
  }

  return Ember.set(root, keyName, value);
}