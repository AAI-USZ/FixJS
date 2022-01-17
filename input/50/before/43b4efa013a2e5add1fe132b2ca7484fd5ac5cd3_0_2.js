function(req, res) {
    res.sendfile("javascripts/" + req.params.file);
    return Logger.info("!! PONG GET REQUEST RECEIVED !!");
  }