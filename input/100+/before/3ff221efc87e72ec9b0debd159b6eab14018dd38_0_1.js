function() {
  // Save the tab the user has currently open: it's the one we'll record from.
  bridge.recordingTab = getBrowser().mCurrentTab;

  // Make it obvious which tab is recording by turning it green!
  bridge.recordingTab.style.setProperty("background-color", "#bfee85", "important");
  
  bridge.recorderWindow = window.open("chrome://seleniumbuilder/content/html/gui.html", "seleniumbuilder", "width=550,height=600,toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=yes,copyhistory=no,resizable=yes");
    
  // Install a listener with the browser to be notified when a new document is loaded.
  try {
    var observerService = Components.classes["@mozilla.org/observer-service;1"].getService(
        Components.interfaces.nsIObserverService);
    var observer = {
      observe: function (win) {
        if (bridge.docLoadListeners[win]) {
          bridge.docLoadListeners[win]();
        }
      }
    };
    observerService.addObserver(observer, "content-document-global-created", false);
  } catch (e) {
    dump(e);
  }
  
  bridge.booter = setInterval(function() {
    if (bridge.recorderWindow.wrappedJSObject.boot) {
      bridge.recorderWindow.wrappedJSObject.boot(bridge);
      clearInterval(bridge.booter);
    }
  }, 100);
}