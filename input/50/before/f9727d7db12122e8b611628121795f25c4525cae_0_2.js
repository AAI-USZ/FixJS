function() {
  //Register the javascript plugin with Cordova
  cordova.addPlugin('GCM', new GCM());

  //Register the native class of plugin with Cordova
  PluginManager.addService("GCMPlugin","com.plugin.GCM.GCMPlugin");

  //alert( "added Service GCMPlugin");
}