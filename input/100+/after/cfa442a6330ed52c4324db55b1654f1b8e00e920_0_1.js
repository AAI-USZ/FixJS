function() {
  var result = [];
  var toInstall = {};
  try {
    var s = builder.plugins.db.createStatement("SELECT identifier FROM state WHERE installState = '" + builder.plugins.TO_INSTALL + "'");
    while (s.executeStep()) {
      result.push(s.row.identifier);
      toInstall[s.row.identifier] = true;
    }
  } finally {s.finalize();}
  var f = builder.plugins.getPluginsDir();
  var en = f.directoryEntries;
  while (en.hasMoreElements()) {
    var child = en.getNext();
    var leafName = child.QueryInterface(Components.interfaces.nsIFile).leafName;
    if (child.QueryInterface(Components.interfaces.nsIFile).isHidden()) {
      continue;
    }
    if (!toInstall[leafName] && builder.plugins.isValidID(leafName)) {
      result.push(leafName);
    }
  }
  return result;
}