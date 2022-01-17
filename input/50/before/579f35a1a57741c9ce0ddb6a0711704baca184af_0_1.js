function arraysEquals(a, b) {
      for (var i = a.length - 1; i >= 0; i--) {
        if (a[i] !== b[i]) {
          return false;
        }
      }
      return true;
    }