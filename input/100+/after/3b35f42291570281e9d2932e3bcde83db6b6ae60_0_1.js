function (value, valueFormat, formatProvider) {
  // FIXME: formatProvider

  if (!valueFormat)
    return value.toString();

  var formatInteger = function (value, radix, digits) {
    digits = parseInt(digits);
    if (isNaN(digits))
      digits = 0;

    var result = parseInt(value).toString(radix);

    while (result.length < digits)
      result = "0" + result;

    return result;
  };

  var formatFloat = function (value, digits) {
    digits = parseInt(digits);
    if (isNaN(digits))
      digits = 2;

    return parseFloat(value).toFixed(digits);
  };

  var insertPlaceSeparators = function (valueString) {
    var pieces = valueString.split(".");

    var newIntegralPart = "";

    for (var i = 0, l = pieces[0].length; i < l; i++) {
      var ch = pieces[0][i];
      var p = (l - i) % 3;

      if ((i > 0) && (p === 0))
        newIntegralPart += ",";

      newIntegralPart += ch;
    }

    pieces[0] = newIntegralPart;

    return pieces.join(".");
  };

  var parsedCustomFormat = JSIL.ParseCustomNumberFormat(valueFormat);

  if (parsedCustomFormat) {
    return parsedCustomFormat(value);

  } else {
    switch (valueFormat[0]) {
      case 'd':
      case 'D':
        return formatInteger(value, 10, valueFormat.substr(1));

      case 'x':
        return formatInteger(value, 16, valueFormat.substr(1)).toLowerCase();

      case 'X':
        return formatInteger(value, 16, valueFormat.substr(1)).toUpperCase();

      case 'f':
      case 'F':
        return formatFloat(value, valueFormat.substr(1));

      case 'n':
      case 'N':
        var result = formatFloat(value, valueFormat.substr(1));
        return insertPlaceSeparators(result);

      default:
        throw new Error("Unsupported format string: " + valueFormat);

    }
  }
}