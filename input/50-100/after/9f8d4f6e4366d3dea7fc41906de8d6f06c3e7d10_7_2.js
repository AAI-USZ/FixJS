function define(name, func, arity, src) {
    var nm;
    func.src = src;
    func.leisureContexts = [];
    nm = nameSub(name);
    func.leisureName = name;
    func.leisureArity = arity;
    if (global.noredefs && (global[nm] != null)) {
      throwError("[DEF] Attempt to redefine definition: " + name);
    }
    global[nm] = global.leisureFuncs[nm] = func;
    leisureAddFunc(name);
    return func;
  }