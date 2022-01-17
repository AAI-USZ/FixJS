function(v, isEnd) {
      if (!isEnd) {
        arr.push(v);
      } else {
        acc = oldAcc;
        acc(arr);
      }
    }