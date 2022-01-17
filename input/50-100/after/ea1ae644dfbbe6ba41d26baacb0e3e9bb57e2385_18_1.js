function(err, secret) {
            if (err) return wsapi.databaseDown(res, err);

            var langContext = wsapi.langContext(req);

            // store the email being added in session data
            req.session.pendingAddition = secret;

            res.json({ success: true });
            // let's now kick out a verification email!
            email.sendConfirmationEmail(req.params.email, req.params.site, secret, langContext);
          }