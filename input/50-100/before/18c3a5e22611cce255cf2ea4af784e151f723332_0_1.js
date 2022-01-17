function(v) {
      arr.push(v);

      if (arr.length >= nvals) {
        acc = oldAcc;
        acc(arr);
      }
    }