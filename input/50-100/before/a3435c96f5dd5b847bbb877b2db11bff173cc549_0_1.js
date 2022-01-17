function(req, res) {

    fs.readFile("public/images/favicon.ico", function(err, icon) {

      if (err) { throw err; }

      console.log("Favicon requested");

      res.writeHead(200, { "Content-Type": "image/x-icon"});

      res.end(icon);

    })

  }