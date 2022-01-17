function rice() {



  var testArticleList = {

    "Test Article One": {

      "date":"2012-01-02",

      "summary":"Summary of the article"

    },

    "Test Article Two": {

      "date":"2012-01-02",

      "summary":"Summary of the article"

    },

    "Test Article Three": {

      "date":"2012-01-02",

      "summary":"Summary of the article"

    }

  };



  router.get("/", function(req, res) {

    fs.readFile("templates/index.dot", function(err, template) {

      if (err) { throw err; }

      res.writeHead(200, { "Content-Type": "text/html"});

      res.end(dot.template(template)(testArticleList));

    });

  });



  router.get("/favicon.ico", function(req, res) {

    fs.readFile("public/images/favicon.ico", function(err, icon) {

      if (err) { throw err; }

      console.log("Favicon requested");

      res.writeHead(200, { "Content-Type": "image/x-icon"});

      res.end(icon);

    })

  });



  router.get("/public/**", function(req, res, path) {

    fs.readFile("public/" + path, function(err, data) {

      if (err) { throw err; }

      res.end(data);

    });

  });



  router.get("/public/stylesheets/**", function(req, res, path) {

    fs.readFile("public/stylesheets/" + path, function(err, data) {

      if (err) { throw err; }

      res.end(data);

    });

  });



  router.get("/public/images/**", function(req, res, path) {

    fs.readFile("public/images/" + path, function(err, data) {

      if (err) { throw err; }

      res.end(data);

    });

  });



  router.get("/*", function(req, res, path) {

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

  });



  return http.createServer(router);

}