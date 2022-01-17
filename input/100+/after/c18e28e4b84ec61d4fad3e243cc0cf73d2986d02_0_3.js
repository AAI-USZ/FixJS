function(pName) {
  var output = "";
  var hasDollar = false;
  var insideVar = false;
  var varName = "";
  var text = builder.selenium2.rcPlayback.currentStep.type.getParamType(pName) == "locator" ? builder.selenium2.rcPlayback.currentStep[pName].getValue() : builder.selenium2.rcPlayback.currentStep[pName];
  for (var i = 0; i < text.length; i++) {
    var ch = text.substring(i, i + 1);
    if (insideVar) {
      if (ch == "}") {
        if (builder.selenium2.rcPlayback.vars[varName] == undefined) {
          throw "Variable not set: " + varName + ".";
        }
        output += builder.selenium2.rcPlayback.vars[varName];
        insideVar = false;
        hasDollar = false;
        varName = "";
      } else {
        varName += ch;
      }
    } else {
      // !insideVar
      if (hasDollar) {
        if (ch == "{") { insideVar = true; } else { hasDollar = false; output += "$" + ch; }
      } else {
        if (ch == "$") { hasDollar = true; } else { output += ch; }
      }
    }
  }

  return builder.selenium2.rcPlayback.currentStep.type.getParamType(pName) == "locator" ? {"using": builder.selenium2.rcPlayback.currentStep[pName].getName(builder.selenium2), "value": output} : output;
}