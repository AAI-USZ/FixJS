function (text) {
  var result = new Array(text.length);

  for (var i = 0, l = text.length; i < l; i++)
    result[i] = text[i];

  return result;
}