function startup(aService) {
  if (gStartupHasRun) return;
  gStartupHasRun = true;

  var loader = Cc["@mozilla.org/moz/jssubscript-loader;1"]
      .getService(Ci.mozIJSSubScriptLoader);
  loader.loadSubScript("chrome://global/content/XPCNativeWrapper.js");
  loader.loadSubScript("chrome://greasemonkey/content/config.js");
  loader.loadSubScript("chrome://greasemonkey/content/miscapis.js");
  loader.loadSubScript("chrome://greasemonkey/content/xmlhttprequester.js");
  loader.loadSubScript("chrome://greasemonkey/content/third-party/mpl-utils.js");

  var observerService = Components.classes['@mozilla.org/observer-service;1']
     .getService(Components.interfaces.nsIObserverService);
  observerService.addObserver(aService, 'document-element-inserted', false);
}