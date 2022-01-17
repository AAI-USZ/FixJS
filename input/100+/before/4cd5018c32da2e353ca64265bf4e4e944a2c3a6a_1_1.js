function createServiceWindow(toURL, name, options, withService, title, readyCallback)
{
  // See if we've already got one...
  let windows = Services.wm.getEnumerator(null);
  while (windows.hasMoreElements()) {
    let sWindow = windows.getNext();
    if (sWindow.wrappedJSObject.service == withService && sWindow.wrappedJSObject.name == name) {
      if (readyCallback) readyCallback();
      return wrapServiceWindowForContent(sWindow);
    }
  }

  let opts = {
      features: options,
      name: name,
      url: toURL,
      title:title,

    onClose: function() {
    },

    onReady: function() {
      try {
        if (aWind.browser.contentWindow.location.href != toURL) {
          return;
        }
        aWind.browser.service = withService;
        if (readyCallback) readyCallback();
      }
      catch(e) {
        Cu.reportError(e);
      }
    }

  };
  var aWind = serviceWindowMaker(opts);
  aWind.service = withService;
  aWind.name = name;
  return wrapServiceWindowForContent(aWind);
}