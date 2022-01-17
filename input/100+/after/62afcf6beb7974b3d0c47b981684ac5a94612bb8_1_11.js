function() {
      var item, items, ret, sym_js_eval;
      sym_js_eval = new C.Symbol("js-eval");
      items = (function() {
        var _i, _len, _ref3, _results;
        _ref3 = this.items;
        _results = [];
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          item = _ref3[_i];
          if (!(this.quasiquoted && item.unquoted)) {
            item.quoted = true;
          }
          _results.push(new C.List([sym_js_eval, new C.String(item._compile())]));
        }
        return _results;
      }).call(this);
      ret = new C.Array(items);
      return ret.compile();
    }