function(options, app) {

  // If externally we're serving content over SSL we can enable things
  // like strict transport security and change the way cookies are set
  const overSSL = (config.get('scheme') == 'https');

  var cookieParser = express.cookieParser();
  var bodyParser = express.bodyParser();

  // stash our forward-to url so different wsapi handlers can use it
  exports.forwardWritesTo = options.forward_writes;

  var cookieSessionMiddleware = sessions({
    secret: COOKIE_SECRET,
    cookieName: COOKIE_KEY,
    duration: config.get('authentication_duration_ms'),
    cookie: {
      path: '/wsapi',
      httpOnly: true,
      maxAge: config.get('authentication_duration_ms'),
      secure: overSSL
    }
  });

  app.use(function(req, resp, next) {
    var purl = url.parse(req.url);

    // cookie sessions are only applied to calls to /wsapi
    // as all other resources can be aggressively cached
    // by layers higher up based on cache control headers.
    // the fallout is that all code that interacts with sessions
    // should be under /wsapi
    if (purl.pathname.substr(0, WSAPI_PREFIX.length) === WSAPI_PREFIX) {
      // explicitly disallow caching on all /wsapi calls (issue #294)
      resp.setHeader('Cache-Control', 'no-cache, max-age=0');

      // we set this parameter so the connect-cookie-session
      // sends the cookie even though the local connection is HTTP
      // (the load balancer does SSL)
      if (overSSL)
        req.connection.proxySecure = true;

      const operation = purl.pathname.substr(WSAPI_PREFIX.length);

      // count the number of WSAPI operation
      statsd.increment("wsapi." + operation);

      // check to see if the api is known here, before spending more time with
      // the request.
      if (!wsapis.hasOwnProperty(operation) ||
          wsapis[operation].method.toLowerCase() !== req.method.toLowerCase())
      {
        // if the fake verification api is enabled (for load testing),
        // then let this request fall through
        if (operation !== 'fake_verification' || !process.env['BROWSERID_FAKE_VERIFICATION'])
          return httputils.badRequest(resp, "no such api");
      }

      // perform full parsing and validation
      return cookieParser(req, resp, function() {
        bodyParser(req, resp, function() {
          cookieSessionMiddleware(req, resp, function() {
            // only on POSTs
            if (req.method === "POST") {

              if (req.session === undefined || typeof req.session.csrf !== 'string') { // there must be a session
                logger.warn("POST calls to /wsapi require a cookie to be sent, this user may have cookies disabled");
                return httputils.forbidden(resp, "no cookie");
              }

              // and the token must match what is sent in the post body
              else if (!req.body || !req.session || !req.session.csrf || req.body.csrf != req.session.csrf) {
                // if any of these things are false, then we'll block the request
                var b = req.body ? req.body.csrf : "<none>";
                var s = req.session ? req.session.csrf : "<none>";
                logger.warn("CSRF validation failure, token mismatch. got:" + b + " want:" + s);
                return httputils.badRequest(resp, "CSRF violation");
              }
            }
            return next();
          });
        });
      });
    } else {
      return next();
    }
  });

  // load all of the APIs supported by this process
  var wsapis = { };

  function describeOperation(name, op) {
    var str = "  " + name + " (";
    str += op.method.toUpperCase() + " - ";
    str += (op.authed ? "" : "not ") + "authed";
    if (op.args) {
      str += " - " + op.args.join(", ");
    }
    if (op.internal) str += ' - internal';
    str += ")";
    logger.debug(str);
  }

  var all = allAPIs();
  Object.keys(all).forEach(function (operation) {
    try {
      var api = all[operation];

      // - don't register read apis if we are configured as a writer,
      // with the exception of ping which tests database connection health.
      // - don't register write apis if we are not configured as a writer
      if ((options.only_write_apis && !api.writes_db && operation != 'ping') ||
          (!options.only_write_apis && api.writes_db))
            return;

      wsapis[operation] = api;

      // set up the argument validator
      if (api.args) {
        if (!Array.isArray(api.args)) throw "exports.args must be an array of strings";
        wsapis[operation].validate = validate(api.args);
      } else {
        wsapis[operation].validate = function(req,res,next) { next(); };
      }

    } catch(e) {
      var msg = "error registering " + operation + " api: " + e;
      logger.error(msg);
      throw msg;
    }
  });

  // debug output - all supported apis
  logger.debug("WSAPIs:");
  Object.keys(wsapis).forEach(function(api) {
    describeOperation(api, wsapis[api]);
  });

  app.use(function(req, resp, next) {
    var purl = url.parse(req.url);

    if (purl.pathname.substr(0, WSAPI_PREFIX.length) === WSAPI_PREFIX) {
      const operation = purl.pathname.substr(WSAPI_PREFIX.length);

      // the fake_verification wsapi is implemented elsewhere.
      if (operation == 'fake_verification') return next();

      // at this point, we *know* 'operation' is valid API, give checks performed
      // above

      // does the request require authentication?
      if (wsapis[operation].authed && !isAuthed(req, wsapis[operation].authed)) {
        return httputils.badRequest(resp, "requires authentication");
      }

      // validate the arguments of the request
      wsapis[operation].validate(req, resp, function() {
        if (wsapis[operation].i18n) {
          abide(req, resp, function () {
            wsapis[operation].process(req, resp);
          });
        } else {
          wsapis[operation].process(req, resp);
        }
      });
    } else {
      next();
    }
  });
}