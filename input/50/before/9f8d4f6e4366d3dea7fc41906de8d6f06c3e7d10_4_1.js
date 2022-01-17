function(ast) {
      return evalCompiledAst(dgen(substituteMacros(ast())));
    }