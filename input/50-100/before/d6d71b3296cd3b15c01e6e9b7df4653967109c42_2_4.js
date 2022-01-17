function (message, url, line) {
    message += '';
    url += '';
    var lastSlash = url.lastIndexOf('/');
    if(lastSlash) {
      url = url.substring(lastSlash + 1, url.length);
    }
    log.error("Got uncaught JS error: " + message + ' (' + url + ':' + line +
        ')');
  }