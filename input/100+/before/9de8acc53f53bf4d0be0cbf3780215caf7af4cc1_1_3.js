function dgen(ast, lazy, name, globals, tokenDef, namespace, src, debug) {
    var argNames, code, jsCode, methodCode, n, res, type, _ref;
    debug = false;
    ast.lits = [];
    res = [];
    code = gen(ast, ast.leisurePrefixCount, ast, new Code().setDebug(debug).setGlobal(cons(name, globals != null ? globals : global.leisureFuncNames)), ast.lits, Nil, true, name, namespace, true);
    if (code.err !== '') {
      ast.err = code.err;
    } else {
      jsCode = !debug || (getAstType(ast)) === 'apply' || !name ? "(" + code.main + ")" : wrapContext(name, ast, code.main, true);
      if (name) {
        n = nameSub(name);
        jsCode = (getAstType(ast)) === 'lambda' ? "(function() {var f = " + jsCode + "; return function " + n + "(){return f;}})()" : "(function " + n + "() {return (" + jsCode + ");})";
      }
      ast.src = name != null ? "" + (code.method != null ? ((_ref = code.method, type = _ref[0], name = _ref[1], argNames = _ref[2], methodCode = _ref[3], _ref), "" + (checkClass(name, n, ast)) + ";\nLeisure.createMethod('" + type + "', '" + name + "', " + (src ? JSON.stringify(src) : "''") + ", function(" + (argNames.slice(1).map(function(n) {
        return nameSub(n);
      }).join(", ")) + ") {return " + methodCode + ";})") : "" + (namespace != null ? namespace : '') + (tokenDef === '=M=' ? 'defineMacro' : 'define') + "('" + name + "', " + jsCode + ", " + (ast.leisurePrefixCount || 0) + ", " + (src ? JSON.stringify(src) : '""') + ");" + ((tokenDef != null) && tokenDef !== '=' ? "\nroot.tokenDefs.push('" + name + "', '" + tokenDef + "');" : '')) : jsCode;
    }
    ast.globals = code.global;
    return ast;
  }