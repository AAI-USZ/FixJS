function() {
  var installeds = builder.plugins.getInstalledIDs();
  for (var i = 0; i < installeds.length; i++) {
    var state = builder.plugins.getState(installeds[i]);
    if (
      (state.installState == builder.plugins.INSTALLED || state.installState == builder.plugins.TO_UNINSTALL)  &&
      (state.enabledState == builder.plugins.ENABLED || state.enabledState == builder.plugins.TO_DISABLE))
    {
      var info = builder.plugins.getInstalledInfo(installeds[i]);
      if (info.shutdownFunction) {
        // Eval is traditionally bad, but we've already let the plugin do whatever it wants!
        eval(info.shutdownFunction + "();");
      }
    }
  }
  builder.plugins.db.close();
}