function evalCompiledAst(ast) {
    console.log("EVAL AST: " + (Parse.print(ast)) + ", " + ast.src);
    if (ast.lits.length) {
      return evalFunc("(function(__lits){\nreturn " + ast.src + "})")(ast.lits);
    } else {
      return Parse.evalFunc(ast.src);
    }
  }