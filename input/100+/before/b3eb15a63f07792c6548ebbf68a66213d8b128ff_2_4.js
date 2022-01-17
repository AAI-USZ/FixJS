function(statusCode, body, contentType) {
    var chunk, contentLength,
      _this = this;
    if (typeof statusCode !== 'number') {
      contentType = body;
      body = statusCode;
      statusCode = 200;
    }
    body || (body = '');
    if (body instanceof soma.Chunk) {
      chunk = body;
      while (chunk.meta) {
        chunk = chunk.meta();
      }
      chunk.on('complete', function() {
        var key, value;
        chunk.emit('render');
        return _this.send("<!doctype html>\n<html " + (_this.manifest || '') + ">\n<head>\n    " + (((function() {
          var _ref, _results;
          _ref = this.head;
          _results = [];
          for (key in _ref) {
            value = _ref[key];
            _results.push(value);
          }
          return _results;
        }).call(_this)).join('\n    ')) + "\n</head>\n<body>\n    " + chunk.html + "\n</body>\n</html>");
      });
      chunk.load(this);
      return;
    }
    if (body instanceof Buffer) {
      contentType || (contentType = 'application/octet-stream');
      contentLength = body.length;
    } else {
      if (typeof body === 'object') {
        body = JSON.stringify(body);
        contentType || (contentType = 'application/json');
      } else {
        contentType || (contentType = 'text/html');
      }
      contentLength = Buffer.byteLength(body);
    }
    this.response.statusCode = statusCode;
    this.response.setHeader('Content-Type', contentType);
    this.response.setHeader('Content-Length', contentLength);
    this.cookies.setHeaders();
    this.response.end(body);
  }