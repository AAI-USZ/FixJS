function(req, res) {

    console.error("route hit");

    var test = git.readFile("fs", req.url, function(err, data) {

      if (err) { throw err; }

      console.log(data.toString());

      res.end(data.toString());

    })

  }