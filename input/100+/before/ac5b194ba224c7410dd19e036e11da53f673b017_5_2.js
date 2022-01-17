function Heroku(opts) {
      this.request = __bind(this.request, this);      var constructor, _i, _len, _ref;
      this.auth = new Buffer(":" + (opts.key || process.env.HEROKU_API_KEY)).toString("base64");
      this.host = opts.host || "api.heroku.com";
      this.http = require(opts.scheme || "https");
      _ref = Heroku.inherited;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        constructor = _ref[_i];
        constructor.apply(this, arguments);
      }
    }