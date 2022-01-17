function(req, resp, next) {
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
  }