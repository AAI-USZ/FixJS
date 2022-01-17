function (text) {
  var result = JSIL.Array.New(System.Char, text.length);

  for (var i = 0, l = text.length; i < l; i++)
    result[i] = text[i];

  return result;
}