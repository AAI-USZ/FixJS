function createServiceWindow(toURL, name, options, withService, title, readyCallback)
{
  // toURL must be same-origin as provider
  let toURI = Services.io.newURI(toURL, null, null);
  if (withService.origin != toURI.prePath && toURI.prePath.indexOf("resource:") != 0) {
    throw new Error("service window url must be same-origin as provider");
  }

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