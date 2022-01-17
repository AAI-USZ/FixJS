function (err, hash) {
        if (err) {
          if (err.indexOf('exceeded') != -1) {
            logger.warn("max load hit, failing on auth request with 503: " + err);
            return httputils.serviceUnavailable(res, "server is too busy");
          }
          logger.error("can't bcrypt: " + err);
          return res.json({ success: false });
        }

        // on failure stageEmail may throw
        try {
          db.stageEmail(uid, req.params.email, hash, function(err, secret) {
            if (err) return wsapi.databaseDown(res, err);

            var langContext = wsapi.langContext(req);

            // store the email being added in session data
            req.session.pendingReset = secret;
            
            res.json({ success: true });

            // let's now kick out a verification email!
            email.sendForgotPasswordEmail(req.params.email, req.params.site, secret, langContext);
          });
        } catch(e) {
          // we should differentiate tween' 400 and 500 here.
          httputils.badRequest(res, e.toString());
        }
      }