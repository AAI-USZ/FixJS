function (rawText) {
    var result = eval(rawText);
    arguments[0] = null;
    rawText = null;
    return result;
  }