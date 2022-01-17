function(obj) {
    // `NaN` is the only value for which `===` is not reflexive.
    return obj !== obj;
  }