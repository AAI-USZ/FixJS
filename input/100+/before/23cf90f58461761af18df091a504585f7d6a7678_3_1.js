function() {
  var
    express = require('express'),
    app = express.createServer(),
    config = require('config'),
    log = require(process.env.APP_PATH + "/lib/log"),
    controller = require(process.env.APP_PATH + "/lib/controller"),
    Auth_Authom = require(process.env.APP_PATH + "/lib/auth/authom").Auth_Authom,
    auth = new Auth_Authom();

  if (!process.env.TESTER) {
    global.socketio = require('socket.io').listen(app);    
  }

  app.configure(function()
  {
    if (process.env.NODE_ENV !== 'development') {
      app.use(express.logger());
    }
    
    app.set('views', process.env.APP_PATH + '/views');
    app.set('view engine', 'jade');

    app.locals({
      config : config
    });

    app.set('config', config);

    // access.log format (default is full)

    if (process.env.NODE_ENV !== 'development') {
      app.use(express.logger());
    }

    // app.use(express.logger({ format: ':method :url' }));
    // app.use(expressValidator); //data validator and sanitizer

    // standard mvc
    // for auth
    app.use(express.cookieParser())
      .use(express.session({
          secret : "string"
          })
        )
//        .use(express.bodyParser()) //no need POST data
      .use(express.methodOverride());

    auth.initApp(app);

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
        log.error('500[app]: ' + req.originalUrl + ', error: ' + err.message); // log
        // real
        // message
        err = error(500, 'Unexpexted error occured'); // override message
      }
      else {
        log.error(err.code + ': ' + req.originalUrl + ', error: ' + err.message);
      }

      res.status(500);
      res.render('info', {
        title : 'Unexpected problem (500)'
      });
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
      log.error('404[app]: ' + req.originalUrl);
      res.status(404);
      res.render('info', {
        title : 'Cannot find page (404)'
      });
    });
  });

  return app;
}