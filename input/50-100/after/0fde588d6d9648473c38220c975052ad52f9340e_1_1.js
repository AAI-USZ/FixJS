function(id) {
  try {
    var f = builder.plugins.getDirForPlugin(id);
    f.append("header.json");
    if (f.isFile()) {
      return JSON.parse(bridge.readFile(f));
    }
  } catch (e) {
    return null;
  }
}