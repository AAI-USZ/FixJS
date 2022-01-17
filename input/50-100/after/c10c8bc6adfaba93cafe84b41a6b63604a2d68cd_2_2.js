function timesReverse(self, n) {
    if (n === 0) return succeed([]);

    return self.then(function(x) {
      return timesReverse(self, n - 1).map(accumulate(x))
    });
  }