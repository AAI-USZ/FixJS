function(defs) {
    var name, o_val, result, scope, sym, sym_def, sym_js_eval, val, var_stmt;
    sym_js_eval = new C.Symbol("js-eval");
    sym_def = new C.Symbol("def");
    defs = (function() {
      var _i, _len, _ref3, _results;
      _results = [];
      for (_i = 0, _len = defs.length; _i < _len; _i++) {
        _ref3 = defs[_i], name = _ref3[0], val = _ref3[1];
        sym = new C.Symbol(name);
        o_val = new C.Raw("" + val);
        _results.push(new C.List([sym_def, sym, o_val]));
      }
      return _results;
    })();
    result = new C.CodeFragment(defs);
    scope = C.current_scope();
    var_stmt = scope.var_stmt();
    return "" + var_stmt + (result._compile()) + ";";
  }