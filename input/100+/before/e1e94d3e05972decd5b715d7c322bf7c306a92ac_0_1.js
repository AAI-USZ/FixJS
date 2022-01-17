function cookieSession(req, res, next) {

    // req.secret is for backwards compatibility
    var secret = options.secret || req.secret;
    if (!secret) throw new Error('`secret` option required for cookie sessions');

    // default session
    req.session = {};

    // cookieParser secret
    if (!options.secret && req.secret) {
      req.session = req.signedCookies[key] || {};
    } else {
      // TODO: refactor
      var rawCookie = req.cookies[key];
      if (rawCookie) {
        var unsigned = utils.parseSignedCookie(rawCookie, secret);
        if (unsigned) {
          var originalHash = crc16(unsigned);
          req.session = utils.parseJSONCookie(unsigned) || {};
        }
      }
    }

    var cookie = req.session.cookie = new Cookie(options.cookie);

    res.on('header', function(){
      // pathname mismatch
      if (0 != req.originalUrl.indexOf(cookie.path)) return;

      // removed
      if (!req.session) {
        debug('clear session');
        res.setHeader('Set-Cookie', key + '=; expires=' + new Date(0).toUTCString());
        return;
      }

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

      // compare hashes, no need to set-cookie if unchanged
      if (originalHash == crc16(val)) return debug('unmodified session');

      // set-cookie
      val = 's:' + utils.sign(val, secret);
      val = cookie.serialize(key, val);
      debug('set-cookie %j', cookie);
      res.setHeader('Set-Cookie', val);
    });

    next();
  }