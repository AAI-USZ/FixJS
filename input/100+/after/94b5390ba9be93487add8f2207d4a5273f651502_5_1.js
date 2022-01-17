function(err, email, uid) {
        if (err) {
          logger.warn("couldn't complete email verification: " + err);
          wsapi.databaseDown(res, err);
        } else {
          // clear the pendingCreation token from the session once we
          // successfully complete user creation
          delete req.session.pendingCreation;

          // At this point, the user is either on the same browser with a token from
          // their email address, OR they've provided their account password.  It's
          // safe to grant them an authenticated session.
          wsapi.authenticateSession({session: req.session,
                                     uid: uid,
                                     level: 'password',
                                     duration_ms: config.get('ephemeral_session_duration_ms')
                                    }, function(err) {
            if (err) return wsapi.databaseDown(res, err);
            res.json({ success: true });
          });
        }
      }