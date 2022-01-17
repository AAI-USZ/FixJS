function session(options){
  var options = options || {}
    , key = options.key || 'connect.sid'
    , store = options.store || new MemoryStore
    , cookie = options.cookie
    , trustProxy = options.proxy;

  // notify user that this store is not
  // meant for a production environment
  if ('production' == env && store instanceof MemoryStore) {
    console.warn(warning);
  }

  // generates the new session
  store.generate = function(req){
    req.sessionID = utils.uid(24);
    req.session = new Session(req);
    req.session.cookie = new Cookie(cookie);
  };

  return function session(req, res, next) {
    // self-awareness
    if (req.session) return next();

    // pathname mismatch
    if (0 != req.originalUrl.indexOf(cookie.path || '/')) return next();

    // backwards compatibility for signed cookies
    // req.secret is passed from the cookie parser middleware
    var secret = options.secret || req.secret;

    // ensure secret is available or bail
    if (!secret) throw new Error('`secret` option required for sessions');

    // parse url
    var url = parse(req)
      , path = url.pathname
      , originalHash;

    // expose store
    req.sessionStore = store;

    // grab the session cookie value and check the signature
    var rawCookie = req.cookies[key];

    // get signedCookies for backwards compat with signed cookies
    var unsignedCookie = req.signedCookies[key];

    if (!unsignedCookie && rawCookie) {
      unsignedCookie = utils.parseSignedCookie(rawCookie, secret);
    }

    // set-cookie
    res.on('header', function(){
      if (!req.session) return;
      var cookie = req.session.cookie
        , proto = (req.headers['x-forwarded-proto'] || '').toLowerCase()
        , tls = req.connection.encrypted || (trustProxy && 'https' == proto)
        , secured = cookie.secure && tls
        , isNew = unsignedCookie != req.sessionID;

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
    });

    // proxy end() to commit the session
    var end = res.end;
    res.end = function(data, encoding){
      res.end = end;
      if (!req.session) return res.end(data, encoding);
      debug('saving');
      req.session.resetMaxAge();
      req.session.save(function(){
        debug('saved');
        res.end(data, encoding);
      });
    };

    // generate the session
    function generate() {
      store.generate(req);
    }

    // get the sessionID from the cookie
    req.sessionID = unsignedCookie;

    // generate a session if the browser doesn't send a sessionID
    if (!req.sessionID) {
      debug('no SID sent, generating session');
      generate();
      next();
      return;
    }

    // generate the session object
    var pause = utils.pause(req);
    debug('fetching %s', req.sessionID);
    store.get(req.sessionID, function(err, sess){
      // proxy to resume() events
      var _next = next;
      next = function(err){
        _next(err);
        pause.resume();
      }

      // error handling
      if (err) {
        debug('error');
        if ('ENOENT' == err.code) {
          generate();
          next();
        } else {
          next(err);
        }
      // no session
      } else if (!sess) {
        debug('no session found');
        generate();
        next();
      // populate req.session
      } else {
        debug('session found');
        store.createSession(req, sess);
        originalHash = hash(sess);
        next();
      }
    });
  };
}