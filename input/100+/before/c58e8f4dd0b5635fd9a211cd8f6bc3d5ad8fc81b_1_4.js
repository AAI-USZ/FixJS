function httpRequestHandler (req, res) {
  var dpath, fpath;

  switch (req.url) {
    // WHITELIST
    case "/client.html":
    case "/client.js":
      fpath = req.url;
      break;
    // DEFAULT ROUTE
    case "/":
      fpath = "/client.html";
      break;
    // 404
    default:
      fpath = "/404.html";
      console.error(404, req.url);
      break;
  }

  switch (path.extname(fpath)) {
    case ".js":
      dpath = lib_dir;
      break;
    case ".html":
    case ".css":
      dpath = static_dir;
      break;
    default:
      res.writeHead(500);
      return res.end("Cannot handle the file extension '" + path.extname(fpath) + "'.");
      break;
  }

  fs.readFile(dpath + fpath, function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end("Error while handling your request.");
    }

    fpath === "/404.html" ? res.writeHead(404) : res.writeHead(200);
    res.end(data);
  });
}