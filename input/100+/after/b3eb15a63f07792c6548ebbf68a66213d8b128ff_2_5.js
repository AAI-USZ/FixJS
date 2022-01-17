function(_super) {

  __extends(ClientContext, _super);

  ClientContext.prototype.inlineScripts = false;

  ClientContext.prototype.inlineStylesheets = false;

  function ClientContext(request, response, scripts) {
    var attributes, key, script, urlParsed, _i, _len;
    this.request = request;
    this.response = response;
    urlParsed = url.parse(this.request.url, true);
    for (key in urlParsed) {
      this[key] = urlParsed[key];
    }
    this.cookies = new jar.Jar(this.request, this.response, ['$ecret']);
    this.head = {};
    this.addHeadElement(new Element('title'));
    this.addHeadElement(new Element('meta', {
      charset: 'utf-8'
    }));
    for (_i = 0, _len = scripts.length; _i < _len; _i++) {
      script = scripts[_i];
      attributes = {
        src: script,
        type: 'text/javascript',
        charset: 'utf8',
        onload: "this.removeAttribute('data-loading');",
        'data-loading': 'loading'
      };
      this.addHeadElement(new Element('script', attributes));
    }
  }

  ClientContext.prototype.addHeadElement = function(el) {
    if (el.headerKey()) {
      this.head[el.headerKey()] = el;
    }
  };

  ClientContext.prototype.addManifest = function(src) {
    return this.manifest = "manifest=" + src;
  };

  ClientContext.prototype.begin = function() {
    var contentType;
    contentType = this.request.headers['content-type'];
    if (contentType) {
      contentType = contentType.split(/;/)[0];
    }
    switch (contentType) {
      case void 0:
      case 'application/x-www-form-urlencoded':
        this._readUrlEncoded();
        break;
      case 'application/json':
        this._readJSON();
        break;
      case 'application/octet-stream':
      case 'multipart/form-data':
        this._readFiles();
    }
  };

  ClientContext.prototype.route = function(data) {
    var result, results, _i, _len;
    this.data = data;
    results = soma.router.run(this.path, this);
    if (!results.length) {
      this.send(404);
    } else {
      for (_i = 0, _len = results.length; _i < _len; _i++) {
        result = results[_i];
        if (result instanceof soma.Chunk) {
          this.send(result);
        }
      }
    }
  };

  ClientContext.prototype.send = function(statusCode, body, contentType) {
    var contentLength,
      _this = this;
    if (typeof statusCode !== 'number') {
      contentType = body;
      body = statusCode;
      statusCode = 200;
    }
    body || (body = '');
    if (body instanceof soma.Chunk) {
      if (this.chunk) {
        throw new Error('Cannot send multiple chunks');
      }
      this.chunk = body;
      while (this.chunk.meta) {
        this.chunk = this.chunk.meta();
      }
      this.chunk.on('complete', function() {
        var key, value;
        _this.chunk.emit('render');
        return _this.send("<!doctype html>\n<html " + (_this.manifest || '') + ">\n<head>\n    " + (((function() {
          var _ref, _results;
          _ref = this.head;
          _results = [];
          for (key in _ref) {
            value = _ref[key];
            _results.push(value);
          }
          return _results;
        }).call(_this)).join('\n    ')) + "\n</head>\n<body>\n    " + _this.chunk.html + "\n</body>\n</html>");
      });
      this.chunk.load(this);
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
  };

  ClientContext.prototype.sendError = function(err, body) {
    if (err) {
      console.log(err.stack);
    }
    return this.send(500, body);
  };

  ClientContext.prototype.go = function(path) {
    if (this.chunk) {
      this.chunk.emit('halt');
      this.chunk = null;
    }
    this.response.statusCode = 303;
    this.response.setHeader('Location', path);
    this.cookies.setHeaders();
    this.response.end();
    return false;
  };

  ClientContext.prototype._readJSON = function() {
    var chunks,
      _this = this;
    chunks = [];
    this.request.on('data', function(chunk) {
      return chunks.push(chunk);
    });
    this.request.on('end', function() {
      return _this.route(JSON.parse(chunks.join("")));
    });
  };

  ClientContext.prototype._readUrlEncoded = function() {
    var chunks,
      _this = this;
    chunks = [];
    this.request.on('data', function(chunk) {
      return chunks.push(chunk);
    });
    this.request.on('end', function() {
      return _this.route(querystring.parse(chunks.join("")));
    });
  };

  ClientContext.prototype._readFiles = function() {
    var uploadRequest,
      _this = this;
    uploadRequest = new upload.UploadRequest(this.request);
    uploadRequest.once('file', function(file) {
      var chunks;
      chunks = [];
      file.on('data', function(chunk) {
        return chunks.push(chunk);
      });
      return file.on('end', function() {
        return _this.route(combineChunks(chunks));
      });
    });
    uploadRequest.begin();
  };

  return ClientContext;

}