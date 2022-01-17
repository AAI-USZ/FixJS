function(req, res) {
    Logger.info("!! PONG JAVASCRIPT GET REQUEST RECEIVED !! " + req.params.file);
    return res.sendfile('public/javascripts/' + req.params.file);
  }