function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end("Error while handling your request.");
    }

    fpath === "/404.html" ? res.writeHead(404) : res.writeHead(200);
    res.end(data);
  }