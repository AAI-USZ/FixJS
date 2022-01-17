function(req, res) {
  // validate
  try {
    sanitize(req.body.email).isEmail();
    sanitize(req.body.site).isOrigin();
  } catch(e) {
    var msg = "invalid arguments: " + e;
    logger.warn("bad request received: " + msg);
    return httputils.badRequest(res, msg);
  }

  // Note, we do no throttling of emails in this case.  Because this call requires
  // authentication, protect a user from themselves could cause more harm than good,
  // specifically we would be removing a user available workaround (i.e. a cosmic ray
  // hits our email delivery, user doesn't get an email in 30s.  User tries again.)

  // one may only reverify an email that is owned and unverified
  db.userOwnsEmail(req.session.userid, req.body.email, function(err, owned) {
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
  });
}