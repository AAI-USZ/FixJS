function (value, radix, digits) {
    digits = parseInt(digits);
    if (isNaN(digits))
      digits = 0;

    var result = parseInt(value).toString(radix);

    while (result.length < digits)
      result = "0" + result;

    return result;
  }