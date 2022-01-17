function () {
    if (!selfSet) {
      self = this;
    }
    var args = Array.prototype.slice.call(arguments);
    var overloadMatch = findOverload(overloadDefs, args);
    if (!overloadMatch) {
      throw new Error(createErrorMessage('No match found.', overloadDefs));
    }
    var overloadFn = overloadMatch[overloadMatch.length - 1];
    overloadFn.apply(self, args);
  }