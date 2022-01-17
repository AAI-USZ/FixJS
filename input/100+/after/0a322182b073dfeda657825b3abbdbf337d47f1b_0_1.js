function(e, email, uid) {
      if (e) {
        logger.warn("couldn't complete email verification: " + e);
        wsapi.databaseDown(res, e);
      } else {
        // now do we need to set the password?
        if (r.needs_password && req.body.pass) {
          // requiring the client to wait until the bcrypt process is complete here
          // exacerbates race conditions in front-end code.  We'll return success early,
          // here, then update the password after the fact.  The worst thing that could
          // happen is that password update could fail (due to extreme load), and the
          // user will have to reset their password.
          wsapi.authenticateSession(req.session, uid, 'password');
          res.json({ success: true });

          wsapi.bcryptPassword(req.body.pass, function(err, hash) {
            if (err) {
              logger.warn("couldn't bcrypt password during email verification: " + err);
              return;
            }
            db.updatePassword(uid, hash, function(err) {
              if (err) {
                logger.warn("couldn't update password during email verification: " + err);
              }
            });
          });
        } else {
          res.json({ success: true });
        }
      }
    }