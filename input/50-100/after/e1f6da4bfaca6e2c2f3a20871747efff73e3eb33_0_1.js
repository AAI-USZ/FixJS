function(html, code) {
      if (code == null) {
        code = 200;
      }
      self.writeHead(code, {
        'Content-Length': Buffer.byteLength(html),
        'Content-Type': 'text/html'
      });
      return self.end(html);
    }