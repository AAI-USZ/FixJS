function() {
  var result = [];
  var f = builder.plugins.getPluginsDir();
  var en = f.directoryEntries;
  while (en.hasMoreElements()) {
    var child = en.getNext();
    if (builder.plugins.isValidID(child.leafName)) {
      result.push(child.leafName);
    }
  }
  return result;
}