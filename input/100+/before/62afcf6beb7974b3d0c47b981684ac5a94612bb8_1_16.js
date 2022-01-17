function() {
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
    }