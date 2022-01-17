function getAst(bx, def) {
    if (bx.ast != null) {
      patchFuncAst(bx.ast);
      return bx.ast;
    } else {
      def = def || bx.textContent;
      setAst(bx, (Leisure.compileNext(def, Leisure.Nil, true, null, true))[0]);
      return bx.ast;
    }
  }