function(req, res) {
  // a password *must* be supplied to this call iff the user's password
  // is currently NULL - this would occur in the case where this is the
  // first secondary address to be added to an account

  // validate
  try {
    sanitize(req.body.email).isEmail();
    sanitize(req.body.site).isOrigin();
  } catch(e) {
    var msg = "invalid arguments: " + e;
    logger.warn("bad request received: " + msg);
    return httputils.badRequest(res, msg);
  }

  db.lastStaged(req.body.email, function (err, last) {
    if (err) return wsapi.databaseDown(res, err);

    if (last && (new Date() - last) < config.get('min_time_between_emails_ms')) {
      logger.warn('throttling request to stage email address ' + req.body.email + ', only ' +
                  ((new Date() - last) / 1000.0) + "s elapsed");
      return httputils.throttled(res, "Too many emails sent to that address, try again later.");
    }

    db.checkAuth(req.session.userid, function(err, hash) {
      var needs_password = !hash;

      if (!err && needs_password && !req.body.pass) {
        err = "user must choose a password";
      }
      if (!err && !needs_password && req.body.pass) {
        err = "a password may not be set at this time";
      }
      if (!err && needs_password) err = wsapi.checkPassword(req.body.pass);

      if (err) {
        logger.info("stage of email fails: " + err);
        return res.json({
          success: false,
          reason: err
        });
      }

      if (needs_password) {
        wsapi.bcryptPassword(req.body.pass, function(err, hash) {
          if (err) {
            logger.warn("couldn't bcrypt password during email verification: " + err);
            return res.json({ success: false });
          }
          completeStage(hash);
        });
      }
      else {
        completeStage(null);
      }

      function completeStage(hash) {
        try {
          // on failure stageEmail may throw
          db.stageEmail(req.session.userid, req.body.email, hash, function(err, secret) {
            if (err) return wsapi.databaseDown(res, err);

            var langContext = wsapi.langContext(req);

            // store the email being added in session data
            req.session.pendingAddition = secret;

            res.json({ success: true });
            // let's now kick out a verification email!
            email.sendConfirmationEmail(req.body.email, req.body.site, secret, langContext);
          });
        } catch(e) {
          // we should differentiate tween' 400 and 500 here.
          httputils.badRequest(res, e.toString());
        }
      }
    });
  });
}