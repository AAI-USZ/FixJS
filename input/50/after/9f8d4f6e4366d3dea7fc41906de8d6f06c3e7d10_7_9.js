function defineMacro(name, func) {
    return global.leisureMacros[name] = func();
  }