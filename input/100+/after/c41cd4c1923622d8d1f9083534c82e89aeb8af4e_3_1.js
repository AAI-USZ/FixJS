function okf() {
      var locMethodName = jQuery('#' + tdd_id).val();
      var locMethod = builder.locator.methodForName(script.seleniumVersion, locMethodName);
      if (locMethod) {
        step[pName].preferredMethod = locMethod;
        step[pName].preferredAlternative = jQuery('#' + stepID + '-p' + pIndex + '-edit-input').data('alt') || 0;
        if (!step[pName].values[step[pName].preferredMethod] || step[pName].values[step[pName].preferredMethod].length == 0)
        {
          step[pName].preferredAlternative = 0;
          step[pName].values[locMethod] = [jQuery('#' + stepID + '-p' + pIndex + '-edit-input').val()];
        } else {
          if (step[pName].preferredAlternative >= step[pName].values[step[pName].preferredMethod].length) {
            step[pName].preferredAlternative = 0;
          }
          step[pName].values[locMethod][step[pName].preferredAlternative] = jQuery('#' + stepID + '-p' + pIndex + '-edit-input').val();
        }
      }
      jQuery('#' + stepID + '-p' + pIndex + '-edit-div').remove();
      jQuery('#' + stepID + '-p' + pIndex).show();
      builder.stepdisplay.updateStep(stepID);
      builder.suite.setCurrentScriptSaveRequired(true);
    }