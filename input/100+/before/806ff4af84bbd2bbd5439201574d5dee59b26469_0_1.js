function(req, socket, head) {
      var url = require('url').parse(req.url);
      var parts = url.pathname.split('/');
      var app = nameToApp(parts[2]);
      if(!app)
        app = nameToApp('root');

      parts.splice(2, 1);
      req.url = parts.join('/');

      //  Need to set this because http-proxy expects it
      //  not sure if this is a bug or not
      req.connection.socket = socket;
      p.proxy.proxyWebSocketRequest(req, socket, head, {host: '127.0.0.1', port: app.port});
    }