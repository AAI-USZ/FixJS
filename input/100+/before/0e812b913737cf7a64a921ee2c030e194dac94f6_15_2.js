function()
{
  var
    http = require('http'),
    express = require('express'),
    config = require('config'),
    log = require(process.env.APP_PATH + "/lib/log"),
    RequestLogger = require(process.env.APP_PATH + "/lib/requestLogger").RequestLogger,
    controller = require(process.env.APP_PATH + "/lib/controller"),
    app = express.createServer(),
    server = http.createServer(app);

  app.configure(function() {
    app.use(express.favicon());

    if (process.env.NODE_ENV !== 'development') {
      app.use(express.logger());
    }

    app.use(express.bodyParser()); //need to POST data
    app.use(express.methodOverride());


    app.use(
      '/api',
      function(req, res, next)
      {
        var
          ip = req.headers['x-real-ip'] || req.headers['remote-addr'] || res.connection.remoteAddress,
          forwardedFor = req.headers['x-forwarded-for'] || '';

        if (config.app.enable_google_analytics) {
          var
            ua = "UA-32533263-1",
            host = req.headers.host,
            GoogleAnalytics = require('ga'),
            ga = new GoogleAnalytics(ua, host);

          ga.trackPage(req.originalUrl);
        }

        // TODO count IP calls
        next();
      });

    // position our routes above the error handling middleware,
    // and below our API middleware, since we want the API validation
    // to take place BEFORE our routes
    app.use(app.router);
    controller.bootControllers(app, '');

    // middleware with an arity of 4 are considered
    // error handling middleware. When you next(err)
    // it will be passed through the defined middleware
    // in order, but ONLY those with an arity of 4, ignoring
    // regular middleware.
    app.use(function(err, req, res, next)
    {

      // on development show debug stack
      if (process.env.NODE_ENV === 'development' && !process.env.TESTER) {
        return next(err); // goto express.errorHandler
      }

      // check error type
      if (!err.hasOwnProperty('code')) {
        log.error('500[api]: ' + req.originalUrl + ', error: ' + err.message); // log
                                                                          // real
                                                                          // message
        err = error(500, 'Unexpexted error occured'); // override message
      }
      else {
        log.error(err.code + ': ' + req.originalUrl + ', error: ' + err.message);
      }

      if (/RedisClient/i.test(err.msg)) {
        err.msg = 'Database problem';
      }

      res.send(err, {
        'Content-Type' : 'application/json'
      }, 200);
      RequestLogger.log(req, err);
    });

    app.use(express.errorHandler({
      showStack : true,
      dumpExceptions : true
    }));

    // our custom JSON 404 middleware. Since it's placed last
    // it will be the last middleware called, if all others
    // invoke next() and do not respond.
    app.use(function(req, res, next)
    {
      log.error('404[api]: ' + req.originalUrl);

      var err = error(404, 'Bad method name');
      res.send(err, {
        'Content-Type' : 'application/json'
      }, 200);
      RequestLogger.log(req, err);
    });
  });

  return server;
}