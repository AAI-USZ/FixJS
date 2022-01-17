function hdArrayProxy(a0, a1) {
      if (arguments.length === 1) {
        /* Array assignment: proxy(other) */
        vv.set(a0);
        runtime.touch(vv);
      } else if (arguments.length === 2) {
        /* Element assignment: proxy(index, elt) */
        vv.value[a0] = a1;
        vv.changeEvent = {
          removes: [{ index: a0, howMany: 1 }],
          adds:    [{ index: a0, howMany: 1 }]
        };
        runtime.touch(vv);
      } else {
        return evaluator.get(vv);
      }
    }