function processRequest(req, res) {
    var file = path.normalize(req.noobhttp.homedir + req.url.pathname), self = this;

    res.setHeader('x-generated-by', 'a noob... xD');
    res.setHeader('x-powered-by', 'Node.js/' + this.nodeVersion);
    res.setHeader('x-content-type-options', 'nosniff');
    res.setHeader('x-xss-protection', '1; mode=block');

    // TODO: implement with the possibility of the user setting the options. prop in req.noobhttp.response.headers loop? move to emitRequest
    //res.setHeader('x-ua-compatible',  'IE=edge,chrome=1');
    //res.setHeader('x-frame-options', '');
    //res.setHeader('x-content-security-policy', '');
    //res.setHeader('x-webkit-csp', '');

    if (this.sharedFiles.hasOwnProperty(path.basename(file))) {
      file = __dirname + '/' + this.sharedFiles[ path.basename(file) ];
    }

    if (file.match(/\/\./)) {
      this.emitError(403, req, res);
      return;
    }

    if (!fs.existsSync(file)) {
      this.emitError(404, req, res);
      return;
    }

    if (['TRACE', 'CONNECT'].indexOf(req.method) !== -1) {
      this.emitError(501, req, res);
      return;
    }

    var stats = fs.lstatSync(file);
    if (stats.isDirectory()) {
      if (!file.match(/\/$/i)) {
        file += "/";
      }

      var acceptedMethods = [];
      ['POST', 'GET', 'DELETE', 'PUT'].forEach(function (method) {
        if (fs.existsSync(file + '.' + method.toLowerCase() + '.js')) {
          acceptedMethods.push(method);
        }
      });

      if (req.method == 'OPTIONS') {
        res.writeHead(200, {
          'content-length': 0,
          'allow': 'OPTIONS' + (acceptedMethods.length > 0 ? ', ' + acceptedMethods.join(', ') : '')
        });

        res.end();
        return;
      }

      if (acceptedMethods.indexOf(req.method) !== -1) {
        // if there is a request for no cache we clear the require cache for this module
        if (req.headers.hasOwnProperty('cache-control') && req.headers['cache-control'] == 'no-cache') {
          var name = require.resolve(file + '.' + req.method.toLowerCase() + '.js');
          delete require.cache[name];
        }

        try {
          var handler = require(file + '.' + req.method.toLowerCase() + '.js');
          if (typeof handler == 'function') {
            handler(req, res, setTimeout(function () {
              self.emitError(500, req, res);
            }, 2000));
          }
        } catch (Error){
          // FIXME: what if the setTimeout has gone off and the module crashes...
          self.emitError(500, req, res);
        }

        return;
      }

      file += "index.html";
      if (!fs.existsSync(file)) {
        this.emitError(405, req, res);
        return;
      }

      stats = fs.lstatSync(file);
    } else if (req.method == 'OPTIONS') {
      res.writeHead(200, {
        'content-length': 0,
        'allow': 'OPTIONS, GET'
      });
      res.end();
      return;
    }

    if (["GET", "HEAD"].indexOf(req.method) == -1) {
      this.emitError(405, req, res);
      return;
    }

    if (req.noobhttp.auth.request) {
      if (!req.headers.hasOwnProperty('authorization')) {
        this.basicAuth(req, res);
        return;
      }

      var auth = new Buffer(((req.headers.authorization || '').split(/\s+/).pop() || ''), 'base64').toString();
      this.emit('auth/' + req.noobhttp.eventString, req, auth.split(/:/)[0], auth.split(/:/)[1]);

      if (!req.noobhttp.auth.authorized) {
        this.basicAuth(req, res);
        return;
      }
    }

    var cachedFilename = this.cache.dir + "/" + req.headers.host + "/" + req.noobhttp.language + file.replace(req.noobhttp.homedir, '');
    if (!fs.existsSync(cachedFilename)
      || (req.headers.hasOwnProperty('cache-control') && req.headers['cache-control'] == 'no-cache')) {
      cachedFilename = null;
    } else {
      stats = fs.lstatSync(cachedFilename);
    }

    var etag = '"' + stats.ino + '-' + stats.size + '-' + Date.parse(stats.mtime) + '"',
      expireDate = new Date(stats.mtime);
    expireDate.setUTCDate(stats.mtime.getUTCDate() + this.cache.days);
    res.setHeader('last-modified', stats.mtime.toUTCString());
    res.setHeader('etag', etag);
    res.setHeader('expires', expireDate.toUTCString());
    res.setHeader('cache-control', 'public, must-revalidate');
    res.setHeader('accept-ranges', 'bytes');
    res.setHeader('content-length', stats.size);

    if (req.headers.hasOwnProperty('if-modified-since')) {
      var since = Date.parse(req.headers['if-modified-since']);
      if (since >= Date.parse(stats.mtime)) {
        res.writeHead(304, {});
        res.end();
        return;
      }
    }

    if (req.headers.hasOwnProperty('if-none-match') && req.headers['if-none-match'] == etag) {
      res.writeHead(304, {});
      res.end();
      return;
    }

    if (req.method == 'HEAD') {
      res.writeHead(200, {'content-type': mime.lookup(file)});
      res.end();
      return;
    }

    // if its larger than a MegaByte we response in streaming
    if ((stats.size / (1024*1024)).toFixed(2) > 1) {
      this.streamResponse(file, stats, req, res);
      return;
    }

    if (cachedFilename) {
      fs.readFile(cachedFilename, function (err, data) {
        if (err) {
          self.emitError(500, req, res);
          return;
        }
        self.emitResponse(file, data, req, res);
      });

      return;
    }

    fs.readFile(file, function (err, data) {
      if (err) {
        self.emitError(500, req, res);
        return;
      }
      self.emitResponse(file, data, req, res);
    });
  }