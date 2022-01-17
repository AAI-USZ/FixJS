function evalSexp(env, sexp) {
    sexp = dup(sexp || { type: T_NIL, expr: null });

    var sym   = dup(env[sexp.name] || { type: T_OBJECT, expr: sexp }),
        typ   = sym.type,
        val   = sym.expr,
        arg   = sexp.chld,
        f, e, i;
    
    if (typ !== T_SPECIAL_FORM)
      arg = keep(mapn(partial(evalSexp, (env = dup(env))), arg));

    switch (typ) {
      case T_NIL:
        return val;
      case T_LAMBDA:
        arg = onlyElems(arg);
        map(function(x,i) {
          sym.env[x] = { type: T_DEFINED, expr: arg[i] };
        }, sym.free);
        console.log("env", sym.env);
        console.log("expr", sym.expr);
        return evalSexp(sym.env, sym.expr);
      case T_FUNCTION:
      case T_SPECIAL_FORM:
        return sexp.chld.length
          ? apply(val, [env, sexp.attr].concat(onlyElems(arg)))
          : sexp;
      case T_DEFINED:
        t = dup(val);
        return evalSexp(env, assoc(val, "attr", dup(val.attr, sexp.attr),
                                        "chld", val.chld.concat(arg)));
      default:
        return assoc(sexp, "chld", arg);
    }
  }