function(err, verified) {
      if (!verified) return httputils.forbidden(res, "that email requires (re)verification");

      // forward to the keysigner!
      var keysigner = urlparse(config.get('keysigner_url'));
      keysigner.path = '/wsapi/cert_key';
      req.body = req.params;
      console.log('bid params', req.params);
      forward(keysigner, req, res, function(err) {
        if (err) {
          logger.error("error forwarding request to keysigner: " + err);
          httputils.serverError(res, "can't contact keysigner");
          return;
        }
      });
    }