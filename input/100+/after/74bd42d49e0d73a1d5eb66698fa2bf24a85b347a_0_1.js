function(req, res) {
  var githubGetToken = 'https://github.com/login/oauth/authorize?client_id=' + process.env.GITHUB_CLIENT_ID + '&scope=gist';

  if (req.query.code) {
    var ghreq = getAccessToken(req.query.code, function(ghres) {
      var ghdata = '';

      ghres.setEncoding('utf8');
      ghres.on('data', function(chunk) {
        ghdata += chunk;
      });
      ghres.on('end', function() {
        var token = null;

        ghdata = JSON.parse(ghdata);
        if (ghdata.access_token) {
          token = ghdata.access_token;
        }
        res.render('index', { githubGetToken: githubGetToken, token: token });
      });
    });
    ghreq.on('error', function(e) {
      console.log("Error getting access token: " + e.message);
      res.render('index', { githubGetToken: githubGetToken, token: null });
    });
    ghreq.end();
  } else {
    res.render('index', { githubGetToken: githubGetToken, token: null });
  }
}