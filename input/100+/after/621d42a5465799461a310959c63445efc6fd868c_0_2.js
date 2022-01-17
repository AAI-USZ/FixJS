function(plate, signed_request) {

  var self = this;
  console.log(signed_request);
  this.plate = plate;
  if (signed_request) {
      console.log("in token assigning part");
      console.log("assigning token as: " + signed_request.oauth_token);
      this.token  = signed_request.oauth_token;
      this.signed_request = signed_request;
  }

  this.app = function(cb) {
    self.get('/' + self.plate.app_id, function(app) {
      cb(app);
    });
  }

  this.me = function(cb) {
    if (self.token) {
      self.get('/me', function(me) {
        cb(me);
      });
    } else {
      cb();
    }
  }

  this.get = function(path, params, cb) {
    if (cb === undefined) {
      cb = params;
      params = {};
    }

    if (self.token)
      params.access_token = self.token;

    try {
      restler.get('https://graph.facebook.com' + path, { query: params }).on('complete', function(data) {
        var result = JSON.parse(data);
        cb(null, result);
      });
    } catch (err) {
      cb(err);
    }
  }

  this.fql = function(query, cb) {
    var params = { access_token: self.token, format:'json' };
    var method;
    var onComplete;

    if (typeof query == 'string') {
      method = 'fql.query';
      params.query = query;
      onComplete = cb;
    }
    else {
      method = 'fql.multiquery';
      params.queries = JSON.stringify(query);
      onComplete = function(res) {
        if (res.error_code)
          return cb(res);

        var data = {};
        res.forEach(function(q) {
          data[q.name] = q.fql_result_set;
        });
        cb(data);
      };
    }
    restler.get('https://api.facebook.com/method/'+method, { query: params }).on('complete', onComplete);
  }

  this.post = function (params, cb) {
    restler.post(
      'https://graph.facebook.com/me/feed',
      {
        query:{
          access_token:self.token
        },
        data: params
      }).on('complete', function (data) {
        var result = JSON.parse(data);
        cb(result.data ? result.data : result);
      });
  }
}