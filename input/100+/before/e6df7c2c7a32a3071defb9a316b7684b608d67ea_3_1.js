function(err, owned) {
    if (err) return wsapi.databaseDown(res, err);

    // not same account? big fat error
    if (!owned) return httputils.badRequest(res, "that email does not belong to you");

    // forward to the keysigner!
    var keysigner = urlparse(config.get('keysigner_url'));
    keysigner.path = '/wsapi/cert_key';
    forward(keysigner, req, res, function(err) {
      if (err) {
        logger.error("error forwarding request to keysigner: " + err);
        httputils.serverError(res, "can't contact keysigner");
        return;
      }
    });
  }