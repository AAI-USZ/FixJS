function(req, res) {
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
    if (err) return wsapi.databaseDown(res, err);

    if (last && (new Date() - last) < config.get('min_time_between_emails_ms')) {
      logger.warn('throttling request to stage email address ' + req.body.email + ', only ' +
                  ((new Date() - last) / 1000.0) + "s elapsed");
      return httputils.throttled(res, "Too many emails sent to that address, try again later.");
    }

    try {
      // on failure stageEmail may throw
      db.stageEmail(req.session.userid, req.body.email, function(err, secret) {
        if (err) return wsapi.databaseDown(res, err);

        var langContext = wsapi.langContext(req);

        // store the email being added in session data
        req.session.pendingAddition = secret;

        res.json({ success: true });
        // let's now kick out a verification email!
        email.sendAddAddressEmail(req.body.email, req.body.site, secret, langContext);
      });
    } catch(e) {
      // we should differentiate tween' 400 and 500 here.
      httputils.badRequest(res, e.toString());
    }
  });
}