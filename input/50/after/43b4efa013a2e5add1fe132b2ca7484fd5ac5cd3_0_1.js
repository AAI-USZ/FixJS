function(req, res) {
    Logger.info("!! PONG GET REQUEST RECEIVED !!");
    return res.render("pong.html");
  }