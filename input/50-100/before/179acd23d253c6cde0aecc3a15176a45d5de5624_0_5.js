function(num, length, pad) {
    var str;
    if (length == null) length = 2;
    if (pad == null) pad = "0";
    str = num.toString(10);
    while (str.length < length) {
      str = pad + str;
    }
    return str;
  }