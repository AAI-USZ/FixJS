function createMethod(leisureClass, methodName, src, definition) {
    var fun, meth;
    fun = Parse.ensureLeisureClass(leisureClass);
    meth = nameSub(methodName);
    if (fun.prototype.hasOwnProperty(meth)) {
      throw new Error("Attempt to redefine existing method: " + leisureClass + "." + methodName + ", current definition: " + (fun.prototype[meth]()) + ", class: " + fun);
    }
    fun.prototype[meth] = definition;
    return definition.src = src;
  }