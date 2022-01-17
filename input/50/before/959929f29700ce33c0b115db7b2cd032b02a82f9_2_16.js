function(obj) {
    return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed));
  }