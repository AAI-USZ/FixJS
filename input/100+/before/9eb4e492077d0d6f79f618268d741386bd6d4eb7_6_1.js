function() {
  var self = this;

  console.log(callback, config.get('twitterToken'), config.get('twitterSecret'))

  oa.getOAuthRequestToken(
    function(err, oauth_token, oauth_token_secret, results) {
    var redirTo;

    if (err) {
      return self.error();
    }

    self.req.session.oauth = {
      token: oauth_token
    , token_secret: oauth_token_secret
    };

    redirTo = 'https://twitter.com/oauth/authenticate?' + querystring.stringify({
      oauth_token: oauth_token
    , oauth_callback: callback
    , force_login: 'true'
    , screen_name: ''
    });  

    self.redirect(redirTo);
  });
}