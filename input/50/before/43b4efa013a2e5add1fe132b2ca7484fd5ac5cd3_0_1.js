function(req, res) {
    res.sendfile("pong.html");
    return Logger.info("!! PONG GET REQUEST RECEIVED !!");
  }