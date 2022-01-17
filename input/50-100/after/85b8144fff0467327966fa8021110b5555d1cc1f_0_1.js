function getAst(bx, def) {
    var _ref;
    if (bx.ast != null) {
      patchFuncAst(bx.ast);
      bx.setAttribute('leisureFunc', (_ref = bx.ast.leisureName) != null ? _ref : '');
      return bx.ast;
    } else {
      def = def || bx.textContent;
      setAst(bx, (Leisure.compileNext(def, Parse.Nil, true, null))[0]);
      return bx.ast;
    }
  }