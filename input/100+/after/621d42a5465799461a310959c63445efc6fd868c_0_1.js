function(signed_request, cb) {
    var encoded_data = signed_request.split('.', 2);

    var sig  = encoded_data[0];
    var json = b64url.decode(encoded_data[1]);
    var data = JSON.parse(json);

    // check algorithm
    if (!data.algorithm || (data.algorithm.toUpperCase() != 'HMAC-SHA256')) {
      throw("unknown algorithm. expected HMAC-SHA256");
    }

    // check signature
    var secret = self.secret;
    var expected_sig = crypto.createHmac('sha256', secret).update(encoded_data[1]).digest('base64').replace(/\+/g,'-').replace(/\//g,'_').replace('=','');

    if (sig !== expected_sig)
      throw("bad signature");
      
    // not logged in or not authorized
    if (!data.user_id) {
      cb(data);
      return;
    }

    if (data.oauth_token) {
      cb(qs.parse(data));
      return;
    }

    if (!data.code)
      throw("no oauth token and no code to get one");

    var params = {
      client_id:     self.app_id,
      client_secret: self.secret,
      redirect_uri:  '',
      code:          data.code
    };

    var request = restler.get('https://graph.facebook.com/oauth/access_token', { query:params });

    request.on('fail', function(data) {
      var result = JSON.parse(data);
      console.log('invalid code: ' + result.error.message);
      cb();
    });

    request.on('success', function(data) {
      cb(qs.parse(data));
    });
  }