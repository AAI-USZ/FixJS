function() {
  // Start up database connection.
  Components.utils.import("resource://gre/modules/Services.jsm");
  var dbFile = builder.plugins.getBuilderDir();
  dbFile.append("plugins.sqlite");
  builder.plugins.db = Services.storage.openDatabase(dbFile); // Will also create the file if it does not exist
  var s = null;
  try {
    s = builder.plugins.db.createStatement("SELECT name FROM sqlite_master WHERE type='table' AND name='state'");
    if (!s.executeStep()) {
      s.finalize();
      s = builder.plugins.db.createStatement("CREATE TABLE state (identifier varchar(255), installState varchar(255), enabledState varchar(255))");
      s.executeStep();
    }
  } finally { s.finalize(); }
  
  // Install new plugins.
  try {
    s = builder.plugins.db.createStatement("SELECT identifier FROM state WHERE installState = '" + builder.plugins.TO_INSTALL + "'");
    var to_install = [];
    while (s.executeStep()) {
      to_install.push(s.row.identifier);
    }
  } finally { s.finalize(); }
  for (var i = 0; i < to_install.length; i++) {
    builder.plugins.performInstall(to_install[i]);
    builder.plugins.setEnabledState(to_install[i], builder.plugins.ENABLED);
  }
  
  // Update plugins
  try {
    s = builder.plugins.db.createStatement("SELECT identifier FROM state WHERE installState = '" + builder.plugins.TO_UPDATE + "'");
    var to_update = [];
    while (s.executeStep()) {
      to_update.push(s.row.identifier);
    }
  } finally { s.finalize(); }
  for (var i = 0; i < to_update.length; i++) {
    builder.plugins.performInstall(to_update[i]);
  }
  
  // Uninstall plugins.
  try {
    s = builder.plugins.db.createStatement("SELECT identifier FROM state WHERE installState = '" + builder.plugins.TO_UNINSTALL + "'");
    var to_uninstall = [];
    while (s.executeStep()) {
      to_uninstall.push(s.row.identifier);
    }
  } finally { s.finalize(); }
  for (var i = 0; i < to_uninstall.length; i++) {
    builder.plugins.performUninstall(to_uninstall[i]);
  }
  
  // Enable and disable plugins.
  try {
    s = builder.plugins.db.createStatement("UPDATE state SET enabledState = '" + builder.plugins.DISABLED + "' WHERE enabledState = '" + builder.plugins.TO_DISABLE + "'");
    s.executeStep();
  } finally { s.finalize(); }
  try {
    s = builder.plugins.db.createStatement("UPDATE state SET enabledState = '" + builder.plugins.ENABLED + "' WHERE enabledState = '" + builder.plugins.TO_ENABLE + "'");
    s.executeStep();
  } finally { s.finalize(); }
  
  // Load plugins
  var installeds = builder.plugins.getInstalledIDs();
  for (var i = 0; i < installeds.length; i++) {
    var state = builder.plugins.getState(installeds[i]);
    if (state.installState == builder.plugins.INSTALLED && state.enabledState == builder.plugins.ENABLED) {
      var info = builder.plugins.getInstalledInfo(installeds[i]);
      if (info.builderMinVersion && info.builderMinVersion > builder.plugins.PLUGINS_BUILDER_VERSION) {
        builder.plugins.setEnabledState(installeds[i], builder.plugins.DISABLED);
        builder.plugins.startupErrors.push("Disabled plugin \"" + info.name + "\": This version of Builder is too old for this plugin. Please update Builder, then re-enable the plugin.");
        continue;
      }
      if (info.builderMaxVersion && info.builderMaxVersion < builder.plugins.PLUGINS_BUILDER_VERSION) {
        builder.plugins.setEnabledState(installeds[i], builder.plugins.DISABLED);
        builder.plugins.startupErrors.push("Disabled plugin \"" + info.name + "\": This version of the plugin is too old. Try updating the plugin.");
        continue;
      }
      var to_load = [];
      for (var j = 0; j < info.load.length; j++) {
        to_load.push(builder.plugins.getResourcePath(installeds[i], info.load[j]));
      }
      builder.loader.loadListOfScripts(to_load);
    }
  }
  
  // Show any startup errors.
  for (var i = 0; i < builder.plugins.startupErrors.length; i++) {
    alert(builder.plugins.startupErrors[i]);
  }
}