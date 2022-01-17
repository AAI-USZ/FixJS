function(v) {
      if (k === undefined) {
        k = v;
        return;
      }

      o[k] = v;
      k = undefined;

      numKeys += 1;

      if (numKeys === nvals) {
        acc = oldAcc;
        acc(o);
      }
    }