function (req, res) {

    res.writeHead(200, { "Content-Type": "image/x-icon" });

    res.end(fs.readFile("favicon.ico", function(err, icon) {

      if (err) { throw err; }

      return icon;

    }));

  }