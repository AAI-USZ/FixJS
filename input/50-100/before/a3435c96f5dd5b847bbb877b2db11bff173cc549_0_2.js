function(req, res, path) {

    console.log("Variable route hit");

    fs.readFile("posts/" + path + ".md", function(err, data) {

      if (err) { 

        // Here's the 404 path

        console.log("Variable route did not exist");

        res.writeHead(404, { "Content-Type": "text/plain"});

        return res.end("Error 404: " + req.url + " not found.");

      }

      console.log("Var serving " + path);

      res.end(data);

    })

  }