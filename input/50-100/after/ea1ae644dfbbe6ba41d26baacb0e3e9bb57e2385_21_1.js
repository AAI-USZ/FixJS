function(err, secret) {
          if (err) return wsapi.databaseDown(res, err);

          // store the email being registered in the session data
          if (!req.session) req.session = {};

          // store the secret we're sending via email in the users session, as checking
          // that it still exists in the database is the surest way to determine the
          // status of the email verification.
          req.session.pendingCreation = secret;

          res.json({ success: true });

          // let's now kick out a verification email!
          email.sendNewUserEmail(req.params.email, req.params.site, secret, langContext);
        }