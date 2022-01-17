function (name, argumentNames, body, closure) {
  var uriRe = /[\<\>\+\/\\\.]/g;
  var uriPrefix = "//@ sourceURL=jsil://generatedFunction/" + name + "\r\n";

  var rawFunctionText = "(function " + JSIL.EscapeJSIdentifier(name) + "(" +
    argumentNames.join(", ") +
    ") {\r\n" +
    body +
    "\r\n})";

  // :|
  argumentNames = null;
  body = null;

  var doEval = function (rawText) {
    var e = eval;
    var result = e(rawText);
    return result;
  };

  var result;

  if (closure) {
    var keys = Object.keys(closure);
    var closureArgumentNames = keys.join(",");
    var closureArgumentList = new Array(keys.length);

    for (var i = 0, l = keys.length; i < l; i++)
      closureArgumentList[i] = closure[keys[i]];

    var lineBreakRE = /\r(\n?)/g;

    rawFunctionText = "(function CreateNamedClosure (" + closureArgumentNames + ") {\r\n" +
      "  return " + rawFunctionText.replace(lineBreakRE, "\r\n    ") + ";\r\n" +
      "})\r\n";

    var constructor = doEval(uriPrefix + rawFunctionText);
    result = constructor.apply(null, closureArgumentList);
  } else {
    result = doEval(uriPrefix + rawFunctionText);
  }

  return result;;
}