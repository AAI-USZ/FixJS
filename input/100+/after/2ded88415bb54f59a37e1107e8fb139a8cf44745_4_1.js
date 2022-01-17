function(step, sourceVersion, targetVersion) {
  var newStep = builder.versionconverter.defaultConvertStep(step, sourceVersion, targetVersion)[0];
  var locVals = {};
  if (step.selectLocator.supportsMethod(builder.locator.methods.xpath)) {
    locVals[builder.locator.methods.xpath] = [step.selectLocator.getValue(builder.locator.methods.xpath) +
      "/*[. = '" + step.optionLocator + "']"];
  } else if (step.selectLocator.supportsMethod(builder.locator.methods.id)) {
    locVals[builder.locator.methods.xpath] = ["//*[@id='" + step.selectLocator.getValue(builder.locator.methods.id) +
      "']/*[. = '" + step.optionLocator + "']"];
  }
  var newLoc = new builder.locator.Locator(builder.locator.methods.xpath, 0, locVals);
  newStep.locator = newLoc;
  return [newStep];
}