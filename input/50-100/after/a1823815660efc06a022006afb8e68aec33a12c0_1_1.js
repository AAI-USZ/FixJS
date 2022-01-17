function(str) {
      var token, _i, _len, _ref;
      _ref = ['snippet', 'include', 'partial', 'raw', 'html', 'json', '__toffee.raw', '__toffee.html', '__toffee.json'];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        token = _ref[_i];
        if (str.slice(0, token.length) === token) {
          return true;
        }
      }
      return false;
    }