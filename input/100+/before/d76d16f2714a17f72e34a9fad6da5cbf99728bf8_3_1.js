function(req, res, next){
    console.log("Meetup called");
    options = {
        host : "secure.meetup.com",
        port : 443,
        path : "/oauth2/authorize",
        method : 'GET'
    };

    if( req.query.error ) {
      next(500);
      return;
    }

    if( typeof req.query.code == 'undefined' ) {
      // redirect to login
      var login_url = "https://secure.meetup.com/oauth2/authorize?client_id="+config.get("meetup_oauth_key")
        + "&response_type=code"
        + "&redirect_uri=http://" + req.headers.host + "/meetup";
      console.log(login_url);
      res.redirect(login_url);
      res.end();
      return;
    }

    console.log(req);

    options.path += "?client_id="+config.get("meetup_oauth_key")
      + "&client_secret=" + config.get("meetup_oauth_secret")
      + "&grant_type=authorization_code"
      + "&redirect_uri=http://" + req.headers.host + "/meetup"
      + "&code=" + req.query.code;

    var request = https.request(options, function(resp) {
      params = {};

      if(resp.statusCode > 400) {
        res.render();
      } else {
        resp.on('data', function(d) {
          userInfo = JSON.parse(d);
          console.log(userInfo);
          req.session.meetup_oauth = userInfo.access_token;
          console.log(resp);
        });
      }
    });
    request.end();
  }