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

  },

      write404 = function(req, res, err) {

        err && console.log(error);

        res.writeHead(404, { "Content-Type": "text/plain"});

        res.end("Error 404: " + req.url + " not found.");

      };



  router.get("/", function(req, res) {

    fs.readFile("templates/index.dot", function(err, template) {

      if (err) { return write404(req, res, err); }

      res.writeHead(200, { "Content-Type": "text/html"});

      res.end(dot.template(template)(testArticleList));

    });

  });



  router.get("/favicon.ico", function(req, res) {

    fs.readFile("public/images/favicon.ico", function(err, icon) {

      if (err) { return write404(req, res, err); }

      console.log("Favicon requested");

      res.writeHead(200, { "Content-Type": "image/x-icon"});

      res.end(icon);

    })

  });



  router.get("/public/stylesheets/*", function(req, res, path) {

    fs.readFile("public/stylesheets/" + path, function(err, stylesheet) {

      if (err) { return write404(req, res, err); }

      res.end(stylesheet);

    });

  });



  router.get("/public/images/*", function(req, res, path) {

    fs.readFile("public/images/" + path, function(err, data) {

      if (err) { return write404(req, res, err); }

      res.end(data);

    });

  });



  router.get("/*", function(req, res, path) {

    console.log("Variable route hit");

    fs.readFile("posts/" + path + ".md", function(err, data) {

      if (err) { return write404(req, res, err); }

      console.log("Var serving " + path);

      res.end(data);

    })

  });



  return http.createServer(router);

}