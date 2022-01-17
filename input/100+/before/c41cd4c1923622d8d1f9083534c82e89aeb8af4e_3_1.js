function okf() {
      var locMethodName = jQuery('#' + tdd_id).val();
      var locMethod = builder.locator.methodForName(script.seleniumVersion, locMethodName);
      if (locMethod) {
        step[pName].preferredMethod = locMethod;
        step[pName].values[locMethod] = jQuery('#' + stepID + '-p' + pIndex + '-edit-input').val();
      }
      /*if (step[pName].alternatives && step[pName].alternatives[step[pName].type] != step[pName].value) {
        step[pName].alternatives = {};
      }*/ // qqDPS
      jQuery('#' + stepID + '-p' + pIndex + '-edit-div').remove();
      jQuery('#' + stepID + '-p' + pIndex).show();
      builder.stepdisplay.updateStep(stepID);
      builder.suite.setCurrentScriptSaveRequired(true);
    }