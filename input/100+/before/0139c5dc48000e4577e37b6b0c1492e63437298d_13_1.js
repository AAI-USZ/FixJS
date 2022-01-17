function makeComputedProxy(vv, set) {
    ASSERT(vv.cellType === "interface" || vv.cellType === "logic",
      "cannot make variable proxy for " + vv);

    if (!set) set = setMissing;
    ASSERT(vv.writtenBy,
      "expected a method to write computed variable");
    var context = vv.writtenBy.context;

    var proxy = function hdComputedProxy(value) {
      if (arguments.length > 0) {
        set.call(context, value);
      } else {
        return evaluator.get(vv);
      }
    };

    return proxies.finishProxy(vv, proxy);
  }