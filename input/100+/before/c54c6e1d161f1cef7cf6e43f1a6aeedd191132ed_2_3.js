function(options, app) {
  const WSAPI_PREFIX = '/wsapi/';

  // all operations that are being forwarded
  var forwardedOperations = [];

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
    if (purl.pathname.substr(0, WSAPI_PREFIX.length) === WSAPI_PREFIX)
    {
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

      // if this request is to be forwarded, we will not perform request validation,
      // cookie parsing, nor body parsing - leaving that up to the process we're forwarding
      // to.
      if (-1 !== forwardedOperations.indexOf(operation)) {
        // queue up the body here on and forward a single unchunked request onto the
        // writer
        return bodyParser(req, resp, function() {
          next();
        });
      } else if (options.router_mode) {
        // skip wsapi request, let browserid middleware handle forwards
        return next();
      } else {
        // this is not a forwarded operation, perform full parsing and validation
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
      }
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
    str += ")";
    logger.debug(str);
  }

  fs.readdirSync(path.join(__dirname, 'wsapi')).forEach(function (f) {
    // skip files that don't have a .js suffix or start with a dot
    if (f.length <= 3 || f.substr(-3) !== '.js' || f.substr(0,1) === '.') return;
    var operation = f.substr(0, f.length - 3);

    try {
      var api = require(path.join(__dirname, 'wsapi', f));

      // don't register read apis if we are configured as a writer,
      // with the exception of ping which tests database connection health.
      if (options.only_write_apis && !api.writes_db &&
          operation != 'ping') return;

      wsapis[operation] = api;

      // forward writes if options.forward_writes is defined
      if (options.forward_writes && wsapis[operation].writes_db &&
          !wsapis[operation].disallow_forward)
      {
        forwardedOperations.push(operation);
        var forward_url = options.forward_writes + "/wsapi/" + operation;
        wsapis[operation].process = function(req, res) {
          forward(forward_url, req, res, function(err) {
            if (err) {
              logger.error("error forwarding '"+ operation +
                           "' request to '" + options.forward_writes + ":" + err);
              httputils.serverError(res, "internal request forwarding error");
            }
          });
        };

        // XXX: disable validation on forwarded requests
        // (we cannot perform this validation because we don't parse cookies
        // nor post bodies on forwarded requests)
        //
        // at some point we'll want to improve our cookie parser and
        // fully validate forwarded requests both at the intermediate
        // hop (webhead) AND final destination (secure webhead)

        delete api.args; // deleting args will cause arg validation to be skipped

        api.authed = false; // authed=false will prevent us from checking auth status
      }

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
    if (options.forward_writes && wsapis[api].writes_db) return;
    describeOperation(api, wsapis[api]);
  });

  if (options.forward_writes) {
    logger.debug("forwarded WSAPIs (to " + options.forward_writes + "):");
    Object.keys(wsapis).forEach(function(api) {
      if (wsapis[api].writes_db) {
        describeOperation(api, wsapis[api]);
      }
    });
  }

  app.use(function(req, resp, next) {
    var purl = url.parse(req.url);

    if (purl.pathname.substr(0, WSAPI_PREFIX.length) === WSAPI_PREFIX) {
      const operation = purl.pathname.substr(WSAPI_PREFIX.length);

      if (options.router_mode && -1 === forwardedOperations.indexOf(operation)) {
        // skip wsapi request, let browserid middleware handle forwards
        return next();
      }

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