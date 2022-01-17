function (err, last) {
    if (err) return wsapi.databaseDown(res, err);

    if (last && (new Date() - last) < config.get('min_time_between_emails_ms')) {
      logger.warn('throttling request to stage email address ' + req.params.email + ', only ' +
                  ((new Date() - last) / 1000.0) + "s elapsed");
      return httputils.throttled(res, "Too many emails sent to that address, try again later.");
    }

    db.checkAuth(req.session.userid, function(err, hash) {
      var needs_password = !hash;

      if (!err && needs_password && !req.params.pass) {
        err = "user must choose a password";
      }
      if (!err && !needs_password && req.params.pass) {
        err = "a password may not be set at this time";
      }

      if (err) {
        logger.info("stage of email fails: " + err);
        return res.json({
          success: false,
          reason: err
        });
      }

      if (needs_password) {
        wsapi.bcryptPassword(req.params.pass, function(err, hash) {
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
          db.stageEmail(req.session.userid, req.params.email, hash, function(err, secret) {
            if (err) return wsapi.databaseDown(res, err);

            var langContext = wsapi.langContext(req);

            // store the email being added in session data
            req.session.pendingAddition = secret;

            res.json({ success: true });
            // let's now kick out a verification email!
            email.sendConfirmationEmail(req.params.email, req.params.site, secret, langContext);
          });
        } catch(e) {
          // we should differentiate tween' 400 and 500 here.
          httputils.badRequest(res, e.toString());
        }
      }
    });
  }