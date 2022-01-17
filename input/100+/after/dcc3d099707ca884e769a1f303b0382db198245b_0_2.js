function (req, res) {
      try {
        hummingbird.serveRequest(req, res);
      } catch (e) {
        hummingbird.handleError(req, res, e);
      }
    }