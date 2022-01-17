function generate(file, contents, loud, handle, nomacros, check, globals, errs, debug) {
    var a, ast, c, code, defs, err, i, m, names, nm, objName, oldRest, out, prev, r, rest, src, v, varOut, _len, _ref, _ref2, _ref3;
    if (loud) console.log("Compiling " + file + ":\n");
    objName = (file != null) && file.match(/\.lsr$/) ? file.substring(0, file.length - 4) : file != null ? file : '_anonymous';
    out = "var " + objName + " = (function(){\nvar root;\n\nif ((typeof window !== 'undefined' && window !== null) && (!(typeof global !== 'undefined' && global !== null) || global === window)) {\n  " + (file != null ? file.replace(/\.lsr/, '') + ' = ' : '') + "root = {};\n  global = window;\n} else {\n  root = typeof exports !== 'undefined' && exports !== null ? exports : this;\n  Parse = require('./parse');\n  Leisure = require('./leisure');" + (includeStd ? "\n  Leisure.req('./prelude');\n  Leisure.req('./std');" : '') + "\n  require('./prim');\n  ReplCore = require('./replCore');\n  Repl = require('./repl');\n}\nroot.defs = {};\nroot.tokenDefs = [];\nroot.macros = {};\n\n" + localPrelude;
    names = globals;
    prev = Parse.Nil;
    if (err) throwError(err);
    defs = [];
    rest = contents;
    varOut = '';
    _ref = globals.toArray();
    for (i = 0, _len = _ref.length; i < _len; i++) {
      v = _ref[i];
      if (i > 0) varOut += ",";
      varOut += " " + (Parse.nameSub(v));
    }
    if (varOut) out += "\nvar" + varOut + ";\n";
    globals = globals.append(getGlobals());
    while (rest && rest.trim()) {
      if (loud > 1 && prev !== names && names !== Parse.Nil) {
        console.log("Compiling function: " + (names.head()));
      }
      oldRest = rest;
      _ref2 = Leisure.compileNext(rest, globals, null, check, nomacros, 'Parse.', debug), ast = _ref2[0], err = _ref2[1], rest = _ref2[2];
      if ((ast != null ? ast.leisureName : void 0) != null) {
        prev = ast.leisureName;
        names = names.tail();
      }
      code = rest ? oldRest.substring(0, oldRest.length - rest.length) : '';
      err = err != null ? err : ast != null ? ast.err : void 0;
      if (err) {
        errs = "" + errs + ((ast != null ? ast.leisureName : void 0) ? "Error in " + ast.leisureName + (showAst(ast)) : "") + err + "\n";
        rest = '';
      } else if (ast) {
        globals = ast.globals;
        m = code.match(Leisure.linePat);
        nm = ast.leisureName;
        ast.src = "//" + (nm != null ? nm + ' = ' : '') + (escape(Parse.print(ast))) + "\n" + (nm != null ? "root.defs." + (Parse.nameSub(nm)) + " = " + (Parse.nameSub(nm)) + " = " : "") + ast.src;
        src = ast.leisureName ? (defs.push(Parse.nameSub(ast.leisureName)), ast.src) : "processResult(" + ast.src + ")";
        out += "" + src + ";\n";
        _ref3 = [vars.a[0], vars.c[0], vars.r[0]], a = _ref3[0], c = _ref3[1], r = _ref3[2];
        if (handle) handlerFunc(ast, null, a, c, r, code);
      }
    }
    out += "\n//if (typeof window !== 'undefined' && window !== null) {\n//  Leisure.processTokenDefs(root.tokenDefs);\n//}\nreturn root;\n}).call(this)";
    if (errs !== '') throwError("Errors compiling " + file + ": " + errs);
    return out;
  }