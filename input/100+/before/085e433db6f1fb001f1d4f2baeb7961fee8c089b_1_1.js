function(err, email, uid, hash) {
    if (err) {
      if (err === 'database unavailable') {
        httputils.serviceUnavailable(res, err);
      } else {
        res.json({
          success: false,
          reason: err
        });
      }
    } else {
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

        res.json({
          success: true,
          email: email,
          must_auth: must_auth
        });
      }

      // backwards compatibility - issue #1592
      // if there is no password in the user record, and no password in the staged
      // table, then we require a password be fetched from the user upon verification.
      // these checks are temporary and should disappear in 1 trains time.
      function needsPassword() {
        // no password is set neither in the user table nor in the staged record.
        // the user must pick a password
        res.json({
          success: true,
          email: email,
          needs_password: true
        });
      }

      if (!hash) {
        if (!uid) {
          needsPassword();
        } else {
          db.checkAuth(uid, function(err, hash) {
            if (err) {
              return res.json({
                success: false,
                reason: err
              });
            }

            if (!hash) {
              needsPassword();
            } else {
              checkMustAuth();
            }
          });
        }
      } else {
        checkMustAuth();
      }

    }
  }