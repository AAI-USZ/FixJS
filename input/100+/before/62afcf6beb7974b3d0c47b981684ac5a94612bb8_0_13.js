function(o) {
    var defs, name, o_val, result, scope, sym, sym_def, sym_do, sym_js_eval, val, var_stmt;
    sym_js_eval = new C.Symbol("js-eval");
    sym_do = new C.Symbol("do");
    sym_def = new C.Symbol("def");
    defs = (function() {
      var _results;
      _results = [];
      for (name in o) {
        if (!__hasProp.call(o, name)) continue;
        val = o[name];
        sym = new C.Symbol(name);
        o_val = new C.List([sym_js_eval, new C.String("" + val)]);
        _results.push(new C.List([sym_def, sym, o_val]));
      }
      return _results;
    })();
    result = new C.List([sym_do].concat(__slice.call(defs)));
    scope = C.current_scope();
    var_stmt = scope.var_stmt();
    return "" + var_stmt + (result._compile()) + ";";
  }