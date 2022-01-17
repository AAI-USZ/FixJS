function(f) {
      var arity, name, _name, _ref;
      name = Parse.getRefVar(f.head());
      arity = typeof global[_name = Parse.nameSub(name)] === "function" ? (_ref = global[_name]()) != null ? _ref.leisureArity : void 0 : void 0;
      if (arity && f.tail().head() < arity) {
        return partial.push([f.head(), arity, f.tail().head()]);
      }
    }