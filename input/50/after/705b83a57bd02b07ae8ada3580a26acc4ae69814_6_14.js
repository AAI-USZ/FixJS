function(x) {
      if (typeof x === 'number') {
        return 0 - x;
      } else {
        return !x;
      }
    }