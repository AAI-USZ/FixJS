function compileAndSend(req, res, next) {
    if (req.method !== 'GET') return next();

    // build an absolute path
    var pathname = url.parse(req.url).pathname,
        opts = utile.clone(options), // clone to avoid async race
        parts, srcFile;

    if (!pathname.match(dstExt)) return next();

    // remove the prefixpath if there is one
    parts = pathname.split('/');
    if (opts.prefixpath) {
      if (parts[1] !== opts.prefixpath) return next();
      pathname = '/' + parts.slice(2, parts.length).join('/');
    }
    srcFile = path.join(srcDir, pathname).replace(dstExt, srcExt);

    opts.cacheKey = srcFile;
    winston.info('setting cachekey to: ' + srcFile);
    getTemplate(srcFile, opts, function(err,t) {
      if (err) return next(err);
      res.setHeader('Date', new Date().toUTCString());
      res.setHeader('Last-Modified', t.mtime.toUTCString());
      res.setHeader('Content-Type', 'application/javascript');
      res.setHeader('Content-Length', t.template.length);
      res.end(t.template);
    });
  }