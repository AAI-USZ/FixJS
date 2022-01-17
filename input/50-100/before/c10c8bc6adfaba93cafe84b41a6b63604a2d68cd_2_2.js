function timesReverse(self, n) {
    if (n === 0) return ensureParser([]);

    return self.then(function(x) {
      return timesReverse(self, n - 1).then(accumulate(x))
    });
  }