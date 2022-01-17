function defineMemoizingGetter(obj, name, getter) {
  Object.defineProperty(obj, name, { get: getter,
                                     configurable: false,
                                     enumerable: false });
}