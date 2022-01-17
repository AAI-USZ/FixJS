function formatHex(number, len) {
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