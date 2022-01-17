function(x) {
      return timesReverse(self, n - 1).map(accumulate(x))
    }