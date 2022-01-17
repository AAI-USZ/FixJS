function compileAndSend(req, res, next) {
    if (req.method !== 'GET') return next();

    // build an absolute path
    var pathname = url.parse(req.url).pathname,
        parts, srcFile;

    if (!pathname.match(dstExt)) return next();

    // remove the prefixpath if there is one
    parts = pathname.split('/');
    if (options.prefixpath) {
      if (parts[1] !== options.prefixpath) return next();
      pathname = '/' + parts.slice(2, parts.length).join('/');
    }
    srcFile = path.join(srcDir, pathname).replace(dstExt, srcExt);

    options.cacheKey = srcFile;
    getTemplate(srcFile, options, function(err,t) {
      if (err) return next(err);
      res.setHeader('Date', new Date().toUTCString());
      res.setHeader('Last-Modified', t.mtime.toUTCString());
      res.setHeader('Content-Type', 'application/javascript');
      res.setHeader('Content-Length', t.template.length);
      res.end(t.template);
    });
  }