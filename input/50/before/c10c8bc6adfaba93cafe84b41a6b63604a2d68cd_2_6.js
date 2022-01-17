function(x) {
      return timesReverse(self, n - 1).then(accumulate(x))
    }