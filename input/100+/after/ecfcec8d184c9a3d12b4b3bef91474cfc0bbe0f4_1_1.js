function(a, parameters) {
  var b = this.wm.getMostRecentWindow("navigator:browser");
  
  // qqDPS This allows for correct window targeting.
  try {
    var foundW = null;
    var en = this.wm.getZOrderDOMWindowEnumerator("navigator:browser", false);
    while (en.hasMoreElements()) {
      var w = en.getNext();
      if ((w.title && w.title.indexOf(parameters['title_identifier']) != -1) ||
          (w.document && w.document.title.indexOf(parameters['title_identifier']) != -1))
      {
        foundW = w;
      }
    }
    if (foundW) {
      b = foundW;
    } else {
      a.value = "NOT FOUND";
      a.send();
      return;
    }
  } catch (e) {
    dump(e);
  }
  
  if(b.fxdriver) {
    var c = Components.classes["@googlecode.com/webdriver/wdsessionstoreservice;1"].getService(Components.interfaces.nsISupports).wrappedJSObject.createSession(), c = c.wrappedJSObject;
    c.setChromeWindow(b);
    a.session = c;
    a.value = c.getId()
  }else {
    a.sendError(new WebDriverError(bot.ErrorCode.UNKNOWN_ERROR, "No drivers associated with the window"))
  }
  a.send()
}