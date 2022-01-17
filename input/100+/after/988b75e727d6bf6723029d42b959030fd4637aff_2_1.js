function login(req, res, next, options) {

  var blogtypeField = options.blogtypeField;

  var blogtype = req.query[blogtypeField];

  var referer = getReferer(req, options);

  if (!options.homeUrl) {

    options.homeUrl = 'http://' + req.headers.host;

  }

  var authCallback = options.homeUrl + options.callbackPath +

    '?' + blogtypeField + '=' + blogtype;

  var user = { blogType: blogtype, oauth_callback: authCallback };

  tapi.get_authorization_url(user, function (err, authInfo) {

    if (err) {

      return next(err);

    }

    if (typeof authInfo === 'string') {

      authInfo = {

        auth_url: authInfo

      };

    }

    authInfo.referer = referer;

    req.session.oauthInfo = authInfo;

    redirect(res, authInfo.auth_url);

  });

}