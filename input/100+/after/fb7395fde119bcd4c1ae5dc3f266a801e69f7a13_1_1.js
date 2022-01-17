function(req, resp) {
  var langContext = wsapi.langContext(req);

  // staging a user logs you out.
  wsapi.clearAuthenticatedUser(req.session);

  // validate
  try {
    sanitize(req.body.email).isEmail();
    sanitize(req.body.site).isOrigin();
  } catch(e) {
    var msg = "invalid arguments: " + e;
    logger.warn("bad request received: " + msg);
    return httputils.badRequest(resp, msg);
  }

  db.lastStaged(req.body.email, function (err, last) {
    if (err) return wsapi.databaseDown(resp, err);

    if (last && (new Date() - last) < config.get('min_time_between_emails_ms')) {
      logger.warn('throttling request to stage email address ' + req.body.email + ', only ' +
                  ((new Date() - last) / 1000.0) + "s elapsed");
      return httputils.throttled(resp, "Too many emails sent to that address, try again later.");
    }

    try {
      // upon success, stage_user returns a secret (that'll get baked into a url
      // and given to the user), on failure it throws
      db.stageUser(req.body.email, function(err, secret) {
        if (err) return wsapi.databaseDown(resp, err);

        // store the email being registered in the session data
        if (!req.session) req.session = {};

        // store the secret we're sending via email in the users session, as checking
        // that it still exists in the database is the surest way to determine the
        // status of the email verification.
        req.session.pendingCreation = secret;

        resp.json({ success: true });

        // let's now kick out a verification email!
        email.sendNewUserEmail(req.body.email, req.body.site, secret, langContext);
      });
    } catch(e) {
      // we should differentiate tween' 400 and 500 here.
      httputils.badRequest(resp, e.toString());
    }
  });
}