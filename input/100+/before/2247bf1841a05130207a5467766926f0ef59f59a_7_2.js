function (uri) {
    var uri = url.parse(uri);

    self.host.push(uri.hostname);
    self.port.push(uri.port || 27017);

    if (!self.name && uri.pathname.replace(/\//g, ''))
      self.name = uri.pathname.replace(/\//g, '');

    if (!self.user && uri.auth) {
      var auth = uri.auth.split(':');
      self.user = auth[0];
      self.pass = auth[1];
    }
  }