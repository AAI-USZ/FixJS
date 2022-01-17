function(req, res) {

    res.writeHead(200, { "Content-Type": "text/html"});

    renderer.home(res);

  }