function(err, stat){
    // mime type
    type = mime.lookup(path);

    // ignore ENOENT, ENAMETOOLONG and ENOTDIR
    if (err) {
      if (fn) return fn(err);
      return ('ENOENT' == err.code || 'ENAMETOOLONG' == err.code || 'ENOTDIR' == err.code)
        ? next()
        : next(err);
    // redirect directory in case index.html is present
    } else if (stat.isDirectory()) {
      if (!redirect) return next();
      url = parse(req.originalUrl);
      res.statusCode = 301;
      res.setHeader('Location', url.pathname + '/');
      res.end('Redirecting to ' + url.pathname + '/');
      return;
    }

    // header fields
    if (!res.getHeader('Last-Modified')) res.setHeader('Last-Modified', stat.mtime.toUTCString());
    if (!res.getHeader('Content-Type')) {
      var charset = mime.charsets.lookup(type);
      res.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''));
    }

    var opts = {}
      , len = stat.size;

    res.setHeader('Content-Length', len);

    // transfer
    if (head) return res.end();

    if (type == 'application/javascript') {
      var content = fs.readFileSync(path, "utf8");
      content = 'alert("inside js");\n' + content;
      res.setHeader('Content-Length', content.length);
      res.end(content);
      return;
    } else if (type == 'text/html') {
      var content = fs.readFileSync(path, "utf8");
      content = '<script>\nalert("inside html");\n</script>' + content;
      res.setHeader('Content-Length', content.length);
      res.end(content);
      return;
    }

    // stream
    var stream = fs.createReadStream(path, opts);
    req.emit('static', stream);
    req.on('close', stream.destroy.bind(stream));
    stream.pipe(res);

    // clean up and flag as
    // done for remaining events
    function callback(err) {
      done || fn(err);
      done = true;
      req.socket.removeListener('error', callback);
    }

    // callback
    if (fn) {
      req.on('close', callback);
      req.socket.on('error', callback);
      stream.on('error', callback);
      stream.on('end', callback);
    } else {
      stream.on('error', function(err){
        if (res.headerSent) {
          console.error(err.stack);
          req.destroy();
        } else {
          next(err);
        }
      });
    }
  }