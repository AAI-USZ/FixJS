function (text) {
  var result = JSIL.Array.New(System.Byte, text.length);
  
  for (var i = 0, l = text.length; i < l; i++)
    result[i] = text.charCodeAt(i) & 0xFF;

  return result;
}