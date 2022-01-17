function(e, email, uid) {
      if (e) {
        logger.warn("couldn't complete email verification: " + e);
        wsapi.databaseDown(res, e);
      } else {
        // now do we need to set the password?
        if (r.needs_password && req.body.pass) {
          wsapi.bcryptPassword(req.body.pass, function(err, hash) {
            if (err) {
              logger.warn("couldn't bcrypt password during email verification: " + err);
              return res.json({ success: false });
            }
            db.updatePassword(uid, hash, function(err) {
              if (err) {
                logger.warn("couldn't update password during email verification: " + err);
                wsapi.databaseDown(res, err);
              } else {
                // XXX: what if our software 503s?  User doesn't get a password set and
                // cannot change it.
                wsapi.authenticateSession(req.session, uid, 'password');
                res.json({ success: !err });
              }
            });
          });
        } else {
          res.json({ success: true });
        }
      }
    }