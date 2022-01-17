function(aChannel) {
    if (!aChannel)
      return;
    // grab the request line
    var internalChannel = null;
    try {
      internalChannel = aChannel.QueryInterface(Ci.nsIHttpChannelInternal);
    } catch (e) {
      CSPdebug("No nsIHttpChannelInternal for " + aChannel.URI.asciiSpec);
    }

    this._request = aChannel.requestMethod + " " + aChannel.URI.asciiSpec;
    this._docRequest = aChannel;

    // We will only be able to provide the HTTP version information if aChannel
    // implements nsIHttpChannelInternal
    if (internalChannel) {
      var reqMaj = {};
      var reqMin = {};
      var reqVersion = internalChannel.getRequestVersion(reqMaj, reqMin);
      this._request += " HTTP/" + reqMaj.value + "." + reqMin.value;
    }
  }