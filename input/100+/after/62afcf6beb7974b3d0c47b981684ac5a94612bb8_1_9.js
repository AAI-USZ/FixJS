function() {
      var body, item, result;
      body = this.body;
      this.body = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = body.length; _i < _len; _i++) {
          item = body[_i];
          _results.push(C.Macro.transform(item));
        }
        return _results;
      })();
      result = Lambda.__super__.compile.apply(this, arguments);
      this.body = body;
      return result;
    }