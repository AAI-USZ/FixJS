function(aDocument, url) {
    var ioService = Components.classes["@mozilla.org/network/io-service;1"]  
                      .getService(Components.interfaces.nsIIOService);
    var baseUri = ioService.newURI(aDocument.baseURI, aDocument.characterSet, null);
    var uri = ioService.newURI(url, aDocument.characterSet, baseUri);
    this._logger.debug("_applyBaseURI(" + aDocument.baseURI +
                                      ", " + url + ") = " + uri.spec);
    return uri.spec;
  }