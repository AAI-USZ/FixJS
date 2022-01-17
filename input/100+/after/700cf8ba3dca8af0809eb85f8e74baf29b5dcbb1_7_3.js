function makeArrayProxy(vv) {
    ASSERT(vv.cellType = "interface",
      "cannot make array proxy for " + vv);
    ASSERT(Array.isArray(vv.value),
      "array proxies are for array values only");

    var proxy = function hdArrayProxy(a0, a1) {
      if (arguments.length === 1) {
        /* Array assignment: proxy(other) */
        vv.set(a0);
        runtime.maybeTouch(vv);
      } else if (arguments.length === 2) {
        /* Element assignment: proxy(index, elt) */
        vv.value[a0] = a1;
        vv.draft("value", {
          removes: [{ index: a0, howMany: 1 }],
          adds:    [{ index: a0, howMany: 1 }]
        });
        runtime.maybeTouch(vv);
      } else {
        return evaluator.get(vv);
      }
    };

    addArrayProxyMethods(proxy);

    return proxies.finishProxy(vv, proxy);
  }