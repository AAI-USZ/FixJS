function(v, isEnd) {
      if (!isEnd) {
        if (k === undefined) {
          k = v;
          return;
        }

        o[k] = v;
        k = undefined;
      } else {
        acc = oldAcc;
        acc(o);
      }
    }