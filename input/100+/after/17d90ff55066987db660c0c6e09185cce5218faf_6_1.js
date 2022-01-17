function attachSearchers(stepID, pIndex, force) {
  var script = builder.getScript();
  // To do this, we first must iterate over the windows in the browser - but of course
  // each window may contain multiple tabs!
  var windowManager = Components.classes['@mozilla.org/appshell/window-mediator;1'].getService(Components.interfaces.nsIWindowMediator);
  var en = windowManager.getEnumerator(null, false);
  while (en.hasMoreElements()) {
    var w = en.getNext();
    for (var i = 0; i < w.frames.length; i++) {
      // This expression filters out the frames that aren't browser tabs.
      // I'm sure there's a better way to detect this, but this would require meaningful
      // documentation in Firefox! qqDPS
      if ((w.frames[i] + "").indexOf("ChromeWindow") == -1) {
        var frame = w.frames[i];
        // Don't attach to the recording window, lest confusion reign.
        if (frame == window) {
          continue;
        }
        // Prevent multiple attached searchers unless force is true.
        if (frame._selenium_builder_hasSearcher && !force) {
          continue;
        }
        frame._selenium_builder_hasSearcher = true;
        
        searchers.push(new builder.VerifyExplorer(
          frame,
          script.seleniumVersion,
          // This function is called when the user selects a new element.
          function(locator) {
            var originalStep = builder.getScript().getStepWithID(stepID);
            originalStep[originalStep.getParamNames()[pIndex]] = locator;
            // Don't immediately stop searchers: this would cause the listener that prevents the
            // click from actually activating the selected element to be detached prematurely.
            setTimeout(stopSearchers, 1);
            window.bridge.focusRecorderWindow();
            builder.stepdisplay.updateStep(stepID);
            builder.suite.setCurrentScriptSaveRequired(true);
            // Update the edit-param view.
            jQuery('#' + stepID + '-p' + pIndex + '-edit-div').remove();
            jQuery('#' + stepID + '-p' + pIndex).show();
            editParam(stepID, pIndex);
          },
          /* justReturnLocator */ true
        ));
      }
    }
  }
}