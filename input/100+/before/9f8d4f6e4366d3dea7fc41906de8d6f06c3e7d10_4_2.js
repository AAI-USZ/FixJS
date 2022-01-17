function genCode(ast, name, globals, defType, rest, parseOnly, namespace, src, debug) {
    if (!parseOnly) {
      dgen(ast, false, name, globals, defType, namespace, src, debug);
    }
    console.log("GEN_CODE: " + ast.src);
    if ((ast.err != null) && (name != null)) {
      ast.err = "Error while compiling " + name + ": " + ast.err;
    }
    return [ast, ast.err, rest];
  }