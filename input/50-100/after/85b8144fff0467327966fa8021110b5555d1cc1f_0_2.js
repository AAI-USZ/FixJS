function() {
    return function(func) {
      return Prim.makeMonad(function(env, cont) {
        var ast, node;
        if (func.leisureName != null) {
          node = document.querySelector("[LeisureFunc=" + func.leisureName + "]");
          if (node != null) {
            ast = getAst(node);
            return cont(_some()(function() {
              return ast;
            }));
          }
        }
        return cont(_none());
      });
    };
  }