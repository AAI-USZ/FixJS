function(err, known) {
      if (err) return wsapi.databaseDown(res, err);

      if (!known) {
        // clear the pendingReset token from the session if we find no such
        // token in the database
        delete req.session.pendingReset;
        return res.json({ success: false} );
      }

      db.completePasswordReset(req.body.token, function(err, email, uid) {
        if (err) {
          logger.warn("couldn't complete email verification: " + err);
          wsapi.databaseDown(res, err);
        } else {
          // clear the pendingReset token from the session once we
          // successfully complete password reset
          delete req.session.pendingReset;

          // At this point, the user is either on the same browser with a token from
          // their email address, OR they've provided their account password.  It's
          // safe to grant them an authenticated session.
          wsapi.authenticateSession(req.session, uid, 'password',
                                    config.get('ephemeral_session_duration_ms'));

          res.json({ success: true });
        }
      });
    }