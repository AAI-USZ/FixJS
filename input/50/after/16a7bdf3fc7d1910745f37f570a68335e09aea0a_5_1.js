function() {
    var script = builder.io.loadNewScriptForSuite();
    if (script) {
      // Save the current script and unselect it to make sure that when we overwrite its
      // info in the GUI by opening the new script, we don't overwrite its info in
      // builder.suite.
      builder.suite.addScript(script);
      builder.gui.menu.updateRunSuiteOnRC();
      builder.stepdisplay.update();
    }
  }