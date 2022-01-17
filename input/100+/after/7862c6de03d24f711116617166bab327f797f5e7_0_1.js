function rice() {



  // Initialize git-fs with the cwd

  git(process.cwd());



  router.get("/", function (req, res) {

    res.end("Homepage");

  });



  router.get("/favicon.ico", function (req, res) {

    res.writeHead(200, { "Content-Type": "image/x-icon" });

    res.end(fs.readFile("favicon.ico", function(err, icon) {

      if (err) { throw err; }

      return icon;

    }));

  });



  router.get("/*", function (req, res) {

    console.error("route hit");



    // At the moment, throws an exception and crashes if you try for a file

    // that's not there



    git.readFile("fs", req.url, function (err, data) {

      if (err) { throw err; }

      console.log(data.toString());

      res.end(data.toString());

    });

  });



  router.notFound( function (req, res) {

    res.writeHead(404, { "Content-Type": "text/plain" });

    res.end("Error 404: " + req.url + " not found.");

  });



  return http.createServer(router);

}