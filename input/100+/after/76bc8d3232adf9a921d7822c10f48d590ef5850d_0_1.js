function cookieParser(req, res, next) {
    if (req.cookies) return next();
    var cookies = req.headers.cookie;

    req.secret = secret;
    req.cookies = {};
    req.signedCookies = {};
    
    if (cookies) {
      try {
        req.cookies = cookie.parse(cookies);
        if (secret) {
          req.signedCookies = utils.parseSignedCookies(req.cookies, secret);
          var obj = utils.parseJSONCookies(req.signedCookies);
          req.signedCookies = obj.cookies;
          req.cookieHashes = obj.hashes;
        }
        req.cookies = utils.parseJSONCookies(req.cookies).cookies;
      } catch (err) {
        return next(err);
      }
    }
    next();
  }