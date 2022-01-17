function() {
      var key, keywords, _i, _len;
      keywords = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = keywords.length; _i < _len; _i++) {
        key = keywords[_i];
        if (this.keywords[key] != null) {
          return this.keywords[key][0].value;
        }
      }
      return;
    }