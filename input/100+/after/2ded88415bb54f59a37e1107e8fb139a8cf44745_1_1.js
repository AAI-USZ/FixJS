function(testCase, originalFormat) {
  if (!testCase) { return null; }
  var script = new builder.Script(builder.selenium1);
  script.path = {
    where: "local",
    path: (testCase.file ? testCase.file.path : null),
    format: originalFormat
  };
  // qqDPS baseurl treatment?
  for (var i = 0; i < testCase.commands.length; i++) {
    var negated = false;
    var stepType = builder.selenium1.stepTypes[testCase.commands[i].command];
    if (!stepType) {
      stepType = builder.selenium1.negatedStepTypes[testCase.commands[i].command];
      negated = true;
    }
    var params = [];
    var pNames = stepType.getParamNames();
    for (var j = 0; j < 2; j++) {
      if (j >= pNames.length) {
        params.push("");
      } else {
        var p = testCase.commands[i][["target", "value"][j]];
        if (stepType.getParamType(pNames[j]) === "locator") {
          var lType = p.substring(0, p.indexOf("="));
          var lValue = p.substring(p.indexOf("=") + 1);
          var locMethod = builder.locator.methodForName(builder.selenium1, lType);
          var locValues = {};
          locValues[locMethod] = [lValue];
          params.push(new builder.locator.Locator(locMethod, 0, locValues));
        } else {
          params.push(p);
        }
      }
    }
    var step = new builder.Step(
      stepType,
      params[0],
      params[1]
    );
    step.negated = negated;
    script.steps.push(step);
  }
  return script;
}