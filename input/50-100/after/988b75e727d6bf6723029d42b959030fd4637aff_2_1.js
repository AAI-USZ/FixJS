function getReferer(req, options) {

  var referer = req.headers.referer || '/';

  if (referer.indexOf(options.loginPath) === 0 || referer.indexOf(options.logoutPath) === 0) {

    referer = '/';

  }

  return referer;

}