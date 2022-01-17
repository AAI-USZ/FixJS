function () {
    // ensure disconnection
    var xhr = io.util.request()
      , uri = this.options.resource + '/' + io.protocol + '/' + this.sessionid;

    xhr.open('GET', uri, true);
    xhr.send(null);

    // handle disconnection immediately
    this.onDisconnect('booted');
  }