function rice() {



  // Initialize git-fs with the cwd

  git(process.cwd());



  router.get('/favicon*', function(req, res) {

    console.log("No favicon");

  })



  router.get('/*', function(req, res) {

    console.error("route hit");

    var test = git.readFile("fs", req.url, function(err, data) {

      if (err) { throw err; }

      console.log(data.toString());

      res.end(data.toString());

    })

  })



  router.notFound( function(req, res) {

    res.writeHead(404, {'Content-Type': 'text/plain'});

    res.end('Error 404: ' + req.url + ' not found.');



  })



  return http.createServer(router);

}