function (name, argumentNames, body) {
  var uriRe = /[\<\>\+\/\\\.]/g;
  var nameRe = /[^A-Za-z_0-9]/g;

  var rawFunctionText = "//@ sourceURL=jsil://generatedFunction/" + name + "\r\n" + 
    "(function " + name.replace(nameRe, "_") + "(" +
    argumentNames.join(", ") +
    ") {\r\n" +
    body +
    "\r\n})\r\n";

  // :|
  argumentNames = null;
  body = null;

  var doEval = function (rawText) {
    var result = eval(rawText);
    return result;
  };

  var result = doEval(rawFunctionText);

  return JSIL.RenameFunction(name, result);
}