function() {
    // call favicon first
    app.use(express.favicon());
    app.use(express.logger('dev'));
    
    // remove the powered by header - lets not give clue to hackers :-)
    app.use(function (req, res, next) {
      res.removeHeader("X-Powered-By");
      next();
    }); 

    // there is a bug in express.js
    // that if https is set, all the redirects
    // would not go to https, fixing
    // the variable req.secure to force 'https'
    if(config.server.scheme==='https') {
      app.use(function(req,res,next) {
        req.secure=true;
        next();
      });
      /*
      app.use(function(req, res, next) {
        var schema = req.headers["x-forwarded-proto"];
        // --- Do nothing if schema is already https
        if (schema === "https")
          return next();
        // --- Redirect to https
        res.redirect("https://" + req.headers.host + req.url);
      });
      */
    }

    // add the server side view engine
    if(config.server.views) {
      app.set('views', config.server.views);
      app.set('view engine', 'jade');
      app.dynamicHelpers( {messages: require('express-messages') });
      // add _ as helper within template
      app.helpers( { _ : require('underscore') });
      winston.debug(pkgname + '  set jade as view engine...path::',config.server.views);
    }
      
    if(config.server.jsonp) {
      app.set('jsonp callback', config.server.jsonp);
      winston.debug(pkgname + '  jsonp:',config.server.jsonp);
    }
      
    app.use(express.bodyParser());
    app.use(express.methodOverride());  
      
    app.use(express.cookieParser());
  }