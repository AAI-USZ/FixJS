function(step, locator) {
    if (step.type != builder.selenium2.stepTypes.sendKeysToElement &&
        step.type != builder.selenium2.stepTypes.clickElement &&
        step.type != builder.selenium2.stepTypes.doubleClickElement &&
        step.type != builder.selenium2.stepTypes.setElementSelected &&
        step.type != builder.selenium2.stepTypes.setElementNotSelected &&
        step.type != builder.selenium2.stepTypes.submitElement)
    {
      return false;
    }
    var stepParams = step.getParamNames();
    for (var i = 0; i < stepParams.length; i++) {
      if (stepParams[i] == "locator") {
        if (locator.probablyHasSameTarget(step["locator"])) {
          return true;
        }
      }
    }
    return false;
  }