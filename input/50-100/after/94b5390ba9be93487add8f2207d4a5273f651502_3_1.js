function(e, email, uid) {
        if (e) {
          logger.warn("couldn't complete email verification: " + e);
          wsapi.databaseDown(res, e);
        } else {
          wsapi.authenticateSession({session: req.session, uid: uid,
                                     level: 'password', duration_ms: undefined},
                                    function(err) {
                                      if (err)
                                        return wsapi.databaseDown(res, err);
                                      res.json({ success: true });
                                    });
        }
      }