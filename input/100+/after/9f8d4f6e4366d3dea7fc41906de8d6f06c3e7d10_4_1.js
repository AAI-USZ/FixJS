function dgen(ast, lazy, name, globals, tokenDef, namespace, src, debug) {
    var code, jsCode, n, res;
    debug = false;
    ast.lits = [];
    res = [];
    code = gen(ast, new Code().setDebug(debug).setGlobal(cons(name, globals != null ? globals : global.leisureFuncNames)), ast.lits, Nil, true, name, namespace, true);
    if (code.err !== '') {
      ast.err = code.err;
    } else {
      jsCode = !debug || (getAstType(ast)) === 'apply' || !name ? "(" + code.main + ")" : wrapContext(name, ast, code.main, true);
      if (name) {
        n = nameSub(name);
        jsCode = (getAstType(ast)) === 'lambda' ? "(function() {var f = " + jsCode + "; return function " + n + "(){return f;}})()" : "(function " + n + "() {return (" + jsCode + ");})";
      }
      ast.src = name != null ? "" + (namespace != null ? namespace : '') + (tokenDef === '=M=' ? 'defineMacro' : 'define') + "('" + name + "', " + jsCode + ", " + ((ast.leisurePrefixCount || 1) - 1) + ", " + (src ? JSON.stringify(src) : '""') + ");" + ((tokenDef != null) && tokenDef !== '=' ? "\nroot.tokenDefs.push('" + name + "', '" + tokenDef + "');" : '') + "\n" : jsCode;
    }
    ast.globals = code.global;
    return ast;
  }