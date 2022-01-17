function(err, buf){
    if (err) return fn(err);
    headers = utils.merge({
        'Content-Length': buf.length
      , 'Content-Type': mime.lookup(src)
      , 'Content-MD5': crypto.createHash('md5').update(buf).digest('base64')
    }, headers);
    var req = self.put(filename, headers);
    registerReqListeners(req, fn);
    req.end(buf);
  }