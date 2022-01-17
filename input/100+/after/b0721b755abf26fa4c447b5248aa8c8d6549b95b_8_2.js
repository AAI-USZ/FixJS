function(req, res) {
  // in order to complete an email confirmation, one of the following must be true:
  //
  // 1. you must already be authenticated as the user who initiated the verification
  // 2. you must provide the password of the initiator.

  db.authForVerificationSecret(req.params.token, function(err, initiator_hash, initiator_uid) {
    if (err) {
      logger.info("unknown verification secret: " + err);
      return wsapi.databaseDown(res, err);
    }

    if (req.session.userid === initiator_uid) {
      postAuthentication();
    } else if (typeof req.params.pass === 'string') {
      bcrypt.compare(req.params.pass, initiator_hash, function (err, success) {
        if (err) {
          logger.warn("max load hit, failing on auth request with 503: " + err);
          return httputils.serviceUnavailable(res, "server is too busy");
        } else if (!success) {
          return httputils.authRequired(res, "password mismatch");
        } else {
          postAuthentication();
        }
      });
    } else {
      return httputils.authRequired(res, "password required");
    }

    function postAuthentication() {
      db.completeConfirmEmail(req.params.token, function(e, email, uid) {
        if (e) {
          logger.warn("couldn't complete email verification: " + e);
          wsapi.databaseDown(res, e);
        } else {
          wsapi.authenticateSession(req.session, uid, 'password');
          res.json({ success: true });
        }
      });
    };
  });
}