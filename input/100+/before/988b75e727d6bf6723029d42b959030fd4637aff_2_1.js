function login(req, res, next, options) {

	var blogtype_field = options.blogtype_field;

	var blogtype = req.query[blogtype_field];

	var referer = get_referer(req, options);

	if (!options.home_url) {

    options.home_url = 'http://' + req.headers.host;

	}

	var auth_callback = options.home_url + options.callback_path 

		+ '?' + blogtype_field + '=' + blogtype;

	var user = { blogType: blogtype };

	tapi.get_authorization_url(user, auth_callback, function(error, auth_url) {

    if (error || !auth_url) {

      if (!error) {

          error = new Error('empty auth_url');

      }

      return options.error_callback(error, referer, user, req, res);

    }

    req.session.oauth_info = {

      oauth_token_secret: user.oauth_token_secret,

      referer: referer

    };

    redirect(res, auth_url);

	});

}