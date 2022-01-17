function(err, owned) {
    if (err) return wsapi.databaseDown(res, err);

    // not same account? big fat error
    if (!owned) return httputils.badRequest(res, "that email does not belong to you");

    // secondary addresses in the database may be "unverified".  this occurs when
    // a user forgets their password.  We will not issue certs for unverified email
    // addresses
    db.emailIsVerified(req.params.email, function(err, verified) {
      if (!verified) return httputils.forbidden(res, "that email requires (re)verification");

      // forward to the keysigner!
      var keysigner = urlparse(config.get('keysigner_url'));
      keysigner.path = '/wsapi/cert_key';

      // parameter validation moves arguments from req.body to req.params,
      // and removes them from req.body.  This feature makes it impossible
      // to use unvalidated params in your wsapi "process" function.
      // 
      // http_forward, however, will only forward params in req.body
      // or req.query.  so we explicitly copy req.params to req.body
      // to cause them to be forwarded.
      req.body = req.params;

      forward(keysigner, req, res, function(err) {
        if (err) {
          logger.error("error forwarding request to keysigner: " + err);
          httputils.serverError(res, "can't contact keysigner");
          return;
        }
      });
    });
  }