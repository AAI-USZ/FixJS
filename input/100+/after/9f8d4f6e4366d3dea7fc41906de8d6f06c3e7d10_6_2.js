function patchFuncAst(ast) {
    var _name, _name2, _ref, _ref2;
    if ((ast != null ? ast.leisureName : void 0) != null) {
      if (typeof window[_name = Parse.nameSub(ast.leisureName)] === "function") {
        if ((_ref = window[_name]()) != null) _ref.ast = ast;
      }
      if (typeof window[_name2 = Parse.nameSub(ast.leisureName)] === "function") {
        if ((_ref2 = window[_name2]()) != null) _ref2.src = ast.leisureSource;
      }
      return update("ast-" + ast.leisureName);
    }
  }