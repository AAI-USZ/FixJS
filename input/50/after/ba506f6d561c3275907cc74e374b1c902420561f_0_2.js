function(id) {
  var f = builder.plugins.getBuilderDir();
  f.append("pluginzips");
  builder.plugins.createDir(f);
  f.append(id + ".zip");
  return f;
}