function testActionStarted(actionName, requiredOptions) {
    ok(actions.called[actionName], actionName + "called");
    for(var key in requiredOptions) {
      equal(actions.info[actionName][key], requiredOptions[key],
          actionName + " called with " + key + "=" + requiredOptions[key]);
    }
  }