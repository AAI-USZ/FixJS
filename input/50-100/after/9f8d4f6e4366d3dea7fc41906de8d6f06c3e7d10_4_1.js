function evalCompiledAst(ast) {
    if (ast.lits.length) {
      return evalFunc("(function(__lits){\nreturn " + ast.src + "})")(ast.lits);
    } else {
      return Parse.evalFunc(ast.src);
    }
  }