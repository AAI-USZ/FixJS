function checkMustAuth() {
      // must the user authenticate?  This is true if they are not authenticated
      // as the uid who initiated the verification, and they are not on the same
      // browser as the initiator
      var must_auth = true;

      if (uid && req.session.userid === uid) {
        must_auth = false;
      }
      else if (typeof req.session.pendingCreation === 'string' &&
               req.query.token === req.session.pendingCreation) {
        must_auth = false;
      }

      res.json({
        success: true,
        email: email,
        must_auth: must_auth
      });
    }