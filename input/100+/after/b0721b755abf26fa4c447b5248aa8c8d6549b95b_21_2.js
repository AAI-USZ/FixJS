function (err, last) {
    if (err) return wsapi.databaseDown(res, err);

    if (last && (new Date() - last) < config.get('min_time_between_emails_ms')) {
      logger.warn('throttling request to stage email address ' + req.params.email + ', only ' +
                  ((new Date() - last) / 1000.0) + "s elapsed");
      return httputils.throttled(res, "Too many emails sent to that address, try again later.");
    }

    // staging a user logs you out.
    wsapi.clearAuthenticatedUser(req.session);

    // now bcrypt the password
    wsapi.bcryptPassword(req.params.pass, function (err, hash) {
      if (err) {
        if (err.indexOf('exceeded') != -1) {
          logger.warn("max load hit, failing on auth request with 503: " + err);
          return httputils.serviceUnavailable(res, "server is too busy");
        }
        logger.error("can't bcrypt: " + err);
        return res.json({ success: false });
      }

      try {
        // upon success, stage_user returns a secret (that'll get baked into a url
        // and given to the user), on failure it throws
        db.stageUser(req.params.email, hash, function(err, secret) {
          if (err) return wsapi.databaseDown(res, err);

          // store the email being registered in the session data
          if (!req.session) req.session = {};

          // store the secret we're sending via email in the users session, as checking
          // that it still exists in the database is the surest way to determine the
          // status of the email verification.
          req.session.pendingCreation = secret;

          res.json({ success: true });

          // let's now kick out a verification email!
          email.sendNewUserEmail(req.params.email, req.params.site, secret, langContext);
        });
      } catch(e) {
        // we should differentiate tween' 400 and 500 here.
        httputils.badRequest(res, e.toString());
      }
    });
  }