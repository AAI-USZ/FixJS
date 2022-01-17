function (err) {
    callback("File not found");
    callback("[server.static] File not found: " + req.url);
  }