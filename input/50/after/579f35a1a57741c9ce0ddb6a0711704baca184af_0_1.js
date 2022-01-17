function mergeArrays(a, b) {
      for (var i = a.length - 1; i >= 0; i--) {
        a[i] = a[i].merge(b[i]);
      }
    }