function (err, data) {
    var content_types = {
          ".html": "text/html",
          ".css": "text/css",
          ".js": "application/javascript"
        }
      , file_extension = path.extname(fpath).toLowerCase();

    if (err) {
      res.writeHead(500);
      return res.end("Error while handling your request.");
    }

    res.setHeader("Content-Type", content_types[file_extension]);
    fpath === "/404.html" ? res.writeHead(404) : res.writeHead(200);
    res.end(data);
  }