function (name, fn) {
  var decl = {
    value: name,
    enumerable: true,
    configurable: true,
    writable: false
  };
  
  Object.defineProperty(fn, "displayName", decl);
  Object.defineProperty(fn, "debugName", decl);

  return fn;
}