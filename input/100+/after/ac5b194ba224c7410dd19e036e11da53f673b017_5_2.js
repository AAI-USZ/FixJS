function() {

    Heroku.inherited = [];

    function Heroku(opts) {
      this.request = __bind(this.request, this);

      var constructor, _i, _len, _ref;
      this.auth = new Buffer(":" + (opts.key || process.env.HEROKU_API_KEY)).toString("base64");
      this.host = opts.host || "api.heroku.com";
      this.http = require(opts.scheme || "https");
      _ref = Heroku.inherited;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        constructor = _ref[_i];
        constructor.apply(this, arguments);
      }
    }

    Heroku.prototype.request = function(opts, fn) {
      var expects, headers, query, req;
      expects = opts.expects || 200;
      query = opts.query;
      headers = {
        "Accept": "application/json",
        "Authorization": "Basic " + this.auth,
        "X-Heroku-API-Version": "3"
      };
      opts = {
        hostname: this.host,
        method: opts.method,
        path: opts.path,
        headers: headers
      };
      if (query != null) {
        query = JSON.stringify(query);
        opts.headers["Content-Type"] = "application/json";
        opts.headers["Content-Length"] = query.length;
      }
      req = this.http.request(opts, function(res) {
        var data;
        if (res.statusCode !== expects) {
          return fn(res, null);
        }
        data = "";
        res.on("data", function(buf) {
          return data += buf;
        });
        return res.on("end", function() {
          try {
            data = JSON.parse(data);
          } catch (err) {

          }
          return fn(null, data);
        });
      });
      return req.end(query);
    };

    return Heroku;

  }