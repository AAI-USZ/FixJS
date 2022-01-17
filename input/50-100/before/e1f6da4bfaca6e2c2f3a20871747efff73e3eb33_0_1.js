function(html) {
      self.writeHead(200, {
        'Content-Length': Buffer.byteLength(html),
        'Content-Type': 'text/html'
      });
      return self.end(html);
    }