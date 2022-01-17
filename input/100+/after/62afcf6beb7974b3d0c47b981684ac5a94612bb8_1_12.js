function() {
      var item, prefix, s_value;
      s_value = (function() {
        var _i, _len, _ref3, _results;
        _ref3 = this.value;
        _results = [];
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          item = _ref3[_i];
          _results.push(oppo.stringify(item));
        }
        return _results;
      }).call(this);
      prefix = this.quoted ? "'" : this.quasiquoted ? "`" : this.unquoted ? "~" : this.unquote_spliced ? "..." : "";
      return "" + prefix + "(" + (s_value.join(' ')) + ")";
    }