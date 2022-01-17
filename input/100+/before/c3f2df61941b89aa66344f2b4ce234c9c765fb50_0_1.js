function cookieSession(req, res, next) {
    req.session = req.signedCookies[key] || {};
    req.session.cookie = new Cookie(req, cookie);

    res.on('header', function(){
      // removed
      if (!req.session) {
        debug('clear session');
        res.setHeader('Set-Cookie', key + '=; expires=' + new Date(0).toUTCString());
        return;
      }

      var cookie = req.session.cookie;
      delete req.session.cookie;

      // check security
      var proto = (req.headers['x-forwarded-proto'] || '').toLowerCase()
        , tls = req.connection.encrypted || (trustProxy && 'https' == proto)
        , secured = cookie.secure && tls;

      // only send secure cookies via https
      if (cookie.secure && !secured) return debug('not secured');

      // serialize
      debug('serializing %j', req.session);
      var val = 'j:' + JSON.stringify(req.session);

      // compare hashes
      var originalHash = req.cookieHashes && req.cookieHashes[key];
      var hash = crc16(val);
      if (originalHash == hash) return debug('unmodified session');

      // set-cookie
      val = utils.sign(val, req.secret);
      val = utils.serializeCookie(key, val, cookie);
      debug('set-cookie %j', cookie);
      res.setHeader('Set-Cookie', val);
    });

    next();
  }