function formatHex(number, len) {
  if (typeof number === "undefined" || number == null || isNaN(number)) {
    throw new Error("Invalid value \"" + number + "\" passed to formatHex()");
  }

  var str = number.toString(16).toUpperCase();

  if (!len) {
    if (str.length % 2 == 1) {
      len = str.length+1;
    }
  }

  while (str.length < len) {
    str = "0" + str;
  }

  return str;
}