function(e) {
    var locator = builder.locator.fromElement(e.target);
    var lastStep = builder.getScript().getLastStep();
        
    // Under some circumstances, for example when the user presses an arrow key, an event can
    // be triggered in Firefox with no e.target.type. Ignore these. 
    if (!e.target.type) {
      return;
    }
    
    // Typing
    if ({ textarea: 1, text: 1, password: 1 }[e.target.type.toLowerCase()]) {
      // Continue typing or replace a click with a type.
      if (lastStep && this.isTypeOrClickInSamePlace(lastStep, locator)) {
        lastStep.changeType(builder.selenium2.stepTypes.setElementText);
        lastStep.text = e.target.value;
        builder.stepdisplay.update();
        return;
      }
      // Also need to check for previous step in case of using enter to submit forms -
      // otherwise we get a spurious extra "type" step after the submit click step.
      var nextToLastStep = builder.getScript().getStepBefore(lastStep);
      if (nextToLastStep && this.isTypeOrClickInSamePlace(nextToLastStep, locator)) {
        nextToLastStep.changeType(builder.selenium2.stepTypes.setElementText);
        nextToLastStep.text = e.target.value;
        builder.stepdisplay.update();
        return;
      }
    
      // Start typing
      this.recordStep(new builder.Step(builder.selenium2.stepTypes.sendKeysToElement, locator, e.target.value));
      return;
    }
    
    // Selecting
    if (e.target.type.toLowerCase() == 'select' || e.target.type.toLowerCase() == 'select-one') {
      var vals = {};
      vals[builder.locator.methods.xpath] = locator.getValueForMethod(builder.locator.methods.xpath) + "/option[" + (e.target.selectedIndex + 1) + "]";
      var optLoc = new builder.locator.Locator(builder.locator.methods.xpath, vals);
      
      // Add select
      this.recordStep(new builder.Step(builder.selenium2.stepTypes.setElementSelected, optLoc));
      return;
    }
    
    if (e.target.type.toLowerCase() == 'select-multiple') {
      var currentVal = jQuery(e.target).val();
      var oldVal = e.target.__sb_oldVal || [];
      for (var c = 0; c < currentVal.length; c++) {
        var newlyAdded = true;
        for (var o = 0; o < oldVal.length; o++) {
          if (currentVal[c] == oldVal[o]) {
            newlyAdded = false;
          }
        }
        if (newlyAdded) {
          var vals = {};
          vals[builder.locator.methods.xpath] = locator.getValueForMethod(builder.locator.methods.xpath) + "/option[normalize-space(.)='" + builder.normalizeWhitespace(currentVal[c]) + "']";
          var optLoc = new builder.locator.Locator(builder.locator.methods.xpath, vals);
          
          this.recordStep(new builder.Step(builder.selenium2.stepTypes.setElementSelected, optLoc));
        }
      }
      for (var o = 0; o < oldVal.length; o++) {
        var stillThere = false;
        for (var c = 0; c < currentVal.length; c++) {
          if (currentVal[c] == oldVal[o]) {
            stillThere = true;
          }
        }
        if (!stillThere) {
          var vals = {};
          vals[builder.locator.methods.xpath] = locator.getValueForMethod(builder.locator.methods.xpath) + "/option[normalize-space(.)='" + builder.normalizeWhitespace(oldVal[o]) + "']";
          var optLoc = new builder.locator.Locator(builder.locator.methods.xpath, vals);
          
          this.recordStep(new builder.Step(builder.selenium2.stepTypes.setElementNotSelected, optLoc));
        }
      }
      e.target.__sb_oldVal = currentVal;
      builder.stepdisplay.update();
    }
    
    // Radio button
    if (e.target.type == 'radio') {
      // Replace a click with a radio button check
      if (isTypeOrClickInSamePlace(lastStep, locator)) {
        lastStep.changeType(builder.selenium2.stepTypes.setElementSelected);
        lastStep.locator = locator
        builder.stepdisplay.update();
        return;
      }

      // Add radio button check
      this.recordStep(new builder.Step(builder.selenium2.stepTypes.setElementSelected, locator));
      return;
    }
  }