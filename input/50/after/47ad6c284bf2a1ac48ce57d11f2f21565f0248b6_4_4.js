function(str, numChars) {
  if (str && str.length > numChars) {
    var op = str.substring(0, numChars - 2) + " \u2026";
    return op;
  }
  return str;
}