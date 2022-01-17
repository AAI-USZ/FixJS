function(){
      if (!req.session) return;
      var cookie = req.session.cookie
        , proto = (req.headers['x-forwarded-proto'] || '').toLowerCase()
        , tls = req.connection.encrypted || (trustProxy && 'https' == proto)
        , secured = cookie.secure && tls
        , isNew = unsignedCookie != req.sessionID;

      // pathname mismatch
      if (0 != req.originalUrl.indexOf(cookie.path)) return;

      // only send secure cookies via https
      if (cookie.secure && !secured) return debug('not secured');

      // browser-session length cookie
      if (null == cookie.expires) {
        if (!isNew) return debug('already set browser-session cookie');
      // compare hashes
      } else if (originalHash == hash(req.session)) {
        return debug('unmodified session');
      }

      var val = 's:' + utils.sign(req.sessionID, secret);
      val = cookie.serialize(key, val);
      debug('set-cookie %s', val);
      res.setHeader('Set-Cookie', val);
    }