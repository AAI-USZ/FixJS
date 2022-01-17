function(req, res) {
    var pathname;
    pathname = url.parse(req.url).pathname;
    if (req.url === '/' && req.method === 'GET') {
      return request({
        uri: view,
        json: true
      }, function(e, r, b) {
        if (e != null) {
          return res.end('DB Not Found.');
        }
        return render(b, function(err, html) {
          return res.end(html);
        });
      });
    } else {
      return filed(__dirname + ("/public" + pathname)).pipe(res);
    }
  }