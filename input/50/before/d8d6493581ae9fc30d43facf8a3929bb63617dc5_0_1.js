function stringReplace(strSearch, strReplace, str) {
  var expression = eval("/" + strSearch + "/g");

  return str.replace(expression, strReplace);
}