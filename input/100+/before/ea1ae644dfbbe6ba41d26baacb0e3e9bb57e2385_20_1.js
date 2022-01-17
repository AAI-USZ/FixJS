function(err, owned) {
    if (err) return res.json({ success: false, reason: err });
    if (!owned) return res.json({ success: false, reason: 'you don\'t control that email address' });

    db.emailIsVerified(req.body.email, function(err, verified) { 
      if (err) return res.json({ success: false, reason: err });
      if (verified) return res.json({ success: false, reason: 'email is already verified' });

      try {
        // on failure stageEmail may throw
        db.stageEmail(req.session.userid, req.body.email, undefined, function(err, secret) {
          if (err) return wsapi.databaseDown(res, err);

          var langContext = wsapi.langContext(req);
          
          // store the email being reverified
          req.session.pendingReverification = secret;
          
          res.json({ success: true });
          // let's now kick out a verification email!
          email.sendConfirmationEmail(req.body.email, req.body.site, secret, langContext);
        });
      } catch(e) {
        // we should differentiate tween' 400 and 500 here.
        httputils.badRequest(res, e.toString());
      }
    });
  }