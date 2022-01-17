function(app) {

  // Issue#1353 This is kind of dirty, but this is our last chance
  // to fixup headers for an ETag cache hit
  // x-frame-options - Allow these to be run within a frame
  app.use(function (req, res, next) {
    if (req.path === '/communication_iframe') {
      res.removeHeader('x-frame-options');
    } else if (req.path === '/relay') {
      res.removeHeader('x-frame-options');
    }
    next();
  });

  // Caching for dynamic resources
  app.use(etagify());

  app.set("views", VIEW_PATH);

  app.set('view options', {
    production: config.get('use_minified_resources')
  });

  app.get('/include.js', function(req, res, next) {
    req.url = "/include_js/include.js";

    if (config.get('use_minified_resources') === true) {
      req.url = "/production/include.js"
    }

    next();
  });

  app.get('/include.orig.js', function(req, res, next) {
    req.url = "/include_js/include.js";
    next();
  });

  // this should probably be an internal redirect
  // as soon as relative paths are figured out.
  app.get('/sign_in', function(req, res, next ) {
    metrics.userEntry(req);
    renderCachableView(req, res, 'dialog.ejs', {
      title: 'A Better Way to Sign In',
      layout: 'dialog_layout.ejs',
      useJavascript: true,
      production: config.get('use_minified_resources')
    });
  });

  app.get('/communication_iframe', function(req, res, next ) {

    renderCachableView(req, res, 'communication_iframe.ejs', {
      layout: false,
      production: config.get('use_minified_resources')
    });
  });

  app.get("/unsupported_dialog", function(req,res) {
    renderCachableView(req, res, 'unsupported_dialog.ejs', {layout: 'dialog_layout.ejs', useJavascript: false});
  });

  app.get("/cookies_disabled", function(req,res) {
    renderCachableView(req, res, 'cookies_disabled.ejs', {layout: 'dialog_layout.ejs', useJavascript: false});
  });

  // Used for a relay page for communication.
  app.get("/relay", function(req, res, next) {
    renderCachableView(req, res, 'relay.ejs', {
      layout: false,
      production: config.get('use_minified_resources')
    });
  });

  app.get("/authenticate_with_primary", function(req,res, next) {
    renderCachableView(req, res, 'authenticate_with_primary.ejs', { layout: false });
  });

  app.get('/', function(req,res) {
    renderCachableView(req, res, 'index.ejs', {title: 'A Better Way to Sign In', fullpage: true});
  });

  app.get("/signup", function(req, res) {
    renderCachableView(req, res, 'signup.ejs', {title: 'Sign Up', fullpage: false});
  });

  app.get("/idp_auth_complete", function(req, res) {
    renderCachableView(req, res, 'idp_auth_complete.ejs', {
      title: 'Sign In Complete',
      fullpage: false
    });
  });

  app.get("/forgot", function(req, res) {
    res.local('util', util);
    renderCachableView(req, res, 'forgot.ejs', {
      title: 'Forgot Password',
      fullpage: false,
      enable_development_menu: config.get('enable_development_menu')
    });
  });

  app.get("/signin", function(req, res) {
    renderCachableView(req, res, 'signin.ejs', {title: 'Sign In', fullpage: false});
  });

  app.get("/about", function(req, res) {
    renderCachableView(req, res, 'about.ejs', {title: 'About', fullpage: false});
  });

  app.get("/tos", function(req, res) {
    renderCachableView(req, res, 'tos.ejs', {title: 'Terms of Service', fullpage: false});
  });

  app.get("/privacy", function(req, res) {
    renderCachableView(req, res, 'privacy.ejs', {title: 'Privacy Policy', fullpage: false});
  });

  app.get("/verify_email_address", function(req, res) {
    res.local('util', util);
    renderCachableView(req, res, 'verify_email_address.ejs', {
      title: 'Complete Registration',
      fullpage: true,
      enable_development_menu: config.get('enable_development_menu')
    });
  });

  // This page can be removed a couple weeks after this code ships into production,
  // we're leaving it here to not break outstanding emails
  app.get("/add_email_address", function(req,res) {
    renderCachableView(req, res, 'confirm.ejs', {title: 'Verify Email Address', fullpage: false});
  });


  app.get("/reset_password", function(req,res) {
    renderCachableView(req, res, 'confirm.ejs', {title: 'Reset Password'});
  });

  app.get("/confirm", function(req,res) {
    renderCachableView(req, res, 'confirm.ejs', {title: 'Confirm Email'});
  });



  // serve up testing templates.  but NOT in staging or production.  see GH-1044
  if ([ 'https://login.persona.org', 'https://login.anosrep.org' ].indexOf(config.get('public_url')) === -1) {
    // serve test.ejs to /test or /test/ or /test/index.html
    app.get(/^\/test\/(?:index.html)?$/, function (req, res) {
      res.render('test.ejs', {title: 'Mozilla Persona QUnit Test', layout: false});
    });

    // l10n test template
    app.get('/i18n_test', function(req, res) {
      renderCachableView(req, res, 'i18n_test.ejs', { layout: false, title: 'l10n testing title' });
    });
  } else {
    // this is stage or production, explicitly disable all resources under /test
    app.get(/^\/test/, function(req, res) {
      httputils.notFound(res, "Cannot " + req.method + " " + req.url);
    });
  }

  // REDIRECTS
  const REDIRECTS = {
    "/developers" : "https://developer.mozilla.org/en/BrowserID/Quick_Setup"
  };

  // set up all the redirects
  // oh my watch out for scope issues on var url - closure time
  for (var url in REDIRECTS) {
    (function(from,to) {
      app.get(from, function(req, res) {
        res.redirect(to);
      });
    })(url, REDIRECTS[url]);
  }

  try {
    const publicKey = secrets.loadPublicKey();
  } catch(e){
    logger.error("can't read public key, exiting: " + e);
    process.nextTick(function() { process.exit(1); });
  }

  // the public key (This location is DEPRECATED)
  app.get("/pk", function(req, res) {
    res.json(publicKey.toSimpleObject());
  });

  // the "declaration of support" style publishing of the public key.
  // login.persona.org is a (uh, THE) secondary, it should publish its key
  // in a manner that is symmetric with how primaries do.  At present,
  // the absence of 'provisioning' and 'authentication' keys indicates
  // that this is a secondary, and verifiers should only trust
  // login.persona.org as a secondary (and anyone else they decide to for
  // whatever reason).
  app.get("/.well-known/browserid", function(req, res) {
    res.json({ 'public-key': publicKey.toSimpleObject() });
  });

  // now for static redirects for cach busting - issue #225
  var versionRegex = /^(\/production\/[a-zA-Z\-]+)_v[a-zA-Z0-9]{7}(\.(?:css|js))$/;
  app.use(function(req, res, next) {
    var m = versionRegex.exec(req.url);
    if (m) {
      var newURL = m[1] + m[2];
      logger.debug('internal redirect of ' + req.url + ' to ' + newURL);
      req.url = newURL;
    }
    next();
  });
}