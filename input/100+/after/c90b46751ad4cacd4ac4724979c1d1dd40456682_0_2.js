function genDispatchDefault(lsrName, name, func, args) {
    var ast, code, f, originalAst, v;
    originalAst = funcAst(func);
    console.log("DISPATCH DEFAULT FOR " + lsrName + "/" + name + ", " + func.src);
    v = getNargs(originalAst, args.length);
    ast = getNthBody(originalAst, args.length);
    if (lsrName === "_append") {
      console.log("_APPEND arg: " + (Parse.print(Parse.getApplyArg(ast))));
    }
    console.log("DISPATCH DEFAULT AST: " + (Parse.print(ast)));
    code = gen(ast, 0, ast, new Code().setGlobal(cons(lsrName, global.leisureFuncNames)), originalAst.lits, v, true, '', "Parse.", true, true);
    if (code.err) throw new Error(code.err);
    code = code.main;
    console.log("DISPATCH DEFAULT: " + code);
    code = "(function (" + (args.slice(1).join(', ')) + "){return (" + code + ")})";
    f = eval(code);
    console.log("DISPATCH DEFAULT CODE: " + f);
    return f;
  }