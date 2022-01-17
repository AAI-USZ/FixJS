function gen(originalAst, prefixCount, ast, code, lits, vars, deref, name, namespace, top, ignoreUnknownNames) {
    var aplCode, arg, argCode, bodyCode, func, funcCode, src, v, val;
    switch (getAstType(ast)) {
      case 'ref':
        val = getRefVar(ast);
        if (val.lambda) {
          return code.addErr("attempt to use lambda as a variable");
        } else {
          code = code.copyWith(nameSub(val)).reffedValue(deref);
          if (ignoreUnknownNames || vars.find(function(v) {
            return v === val;
          })) {
            return code.addVar(val);
          } else if ((ctx[nameSub(val)] != null) || code.global.find(function(v) {
            return v === val;
          }) || (forward[nameSub(val)] != null)) {
            return code;
          } else if (typeof val === 'number') {
            return code.copyWith(val).unreffedValue(deref, name, ast, top);
          } else {
            return code.addErr("attempt to use free variable: " + val + " in " + (Parse.print(originalAst)));
          }
        }
        break;
      case 'lit':
        val = getLitVal(ast);
        src = typeof val === 'function' || typeof val === 'object' ? (lits.push(val), "(function(){\nreturn __lits[" + (lits.length - 1) + "]\n})") : JSON.stringify(val);
        return code.copyWith(src).unreffedValue(deref, name, ast, top);
      case 'lambda':
        v = getLambdaVar(ast);
        bodyCode = gen(originalAst, prefixCount - 1, getLambdaBody(ast), code, lits, cons(v, vars), true, name, namespace, false, ignoreUnknownNames);
        bodyCode = (originalAst.leisureTypeAssertions != null) && (prefixCount === 1) ? generateDispatch(name, originalAst, bodyCode) : bodyCode;
        bodyCode = bodyCode.setVars(bodyCode.vars.removeAll(function(bv) {
          return bv === v;
        }));
        bodyCode = bodyCode.copyWith(wrap(name, ast, nameSub(v), bodyCode.main, namespace)).memoize(deref, name, ast, top);
        return bodyCode;
      case 'apply':
        func = getApplyFunc(ast);
        if (getAstType(func) === 'lit') {
          return code.addErr("Attempt to use lit as function: " + (getLitVal(func)));
        } else if (!ignoreUnknownNames && freeVar(func, vars, code.global)) {
          return code.addErr("Attempt to use free variable as function: " + (getRefVar(func)));
        } else {
          arg = getApplyArg(ast);
          funcCode = gen(originalAst, prefixCount, func, code, lits, vars, true, name, namespace, false, ignoreUnknownNames);
          argCode = gen(originalAst, prefixCount, arg, funcCode, lits, vars, false, name, namespace, false, ignoreUnknownNames);
          aplCode = code.debug ? wrapContext(name, ast, "" + funcCode.main + "(" + argCode.main + ")", top) : "" + funcCode.main + "(" + argCode.main + ")";
          return argCode.copyWith(aplCode).memoize(deref, name, ast, top);
        }
        break;
      default:
        return code.addErr("Unknown object type in gen: " + ast);
    }
  }