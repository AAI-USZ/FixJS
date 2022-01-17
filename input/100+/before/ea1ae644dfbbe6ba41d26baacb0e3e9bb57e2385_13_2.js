function(err, email, uid, hash) {
    if (err) {
      if (err === 'database unavailable') {
        return httputils.serviceUnavailable(res, err);
      } else {
        return res.json({
          success: false,
          reason: err
        });
      }
    } 

    function checkMustAuth() {
      // must the user authenticate?  This is true if they are not authenticated
      // as the uid who initiated the verification, and they are not on the same
      // browser as the initiator
      var must_auth = true;

      if (uid && req.session.userid === uid) {
        must_auth = false;
      }
      else if (!uid && typeof req.session.pendingCreation === 'string' &&
               req.query.token === req.session.pendingCreation) {
        must_auth = false;
      }
      else if (typeof req.session.pendingReset === 'string' &&
               req.query.token === req.session.pendingReset)
      {
        must_auth = false;
      }
      // NOTE: for reverification, we require you're authenticated.  it's not enough
      // to be on the same browser - that path is nonsensical because you must be
      // authenticated to initiate a re-verification.

      res.json({
        success: true,
        email: email,
        must_auth: must_auth
      });
    }

    if (!hash) {
      // if no password is set in the stage table, this is probably an email addition
      db.checkAuth(uid, function(err, hash) {
        if (err) {
          return res.json({
            success: false,
            reason: err
          });
        } else if (!hash) {
          return res.json({
            success: false,
            reason: "missing password for user"
          });
        }
        checkMustAuth();
      });
    } else {
      checkMustAuth();
    }
  }