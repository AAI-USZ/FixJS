function(err) {
              if (err) {
                logger.warn("couldn't update password during email verification: " + err);
                wsapi.databaseDown(res, err);
              } else {
                // XXX: what if our software 503s?  User doesn't get a password set and
                // cannot change it.
                wsapi.authenticateSession(req.session, uid, 'password');
                res.json({ success: !err });
              }
            }