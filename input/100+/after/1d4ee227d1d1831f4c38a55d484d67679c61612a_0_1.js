function editParam(stepID, pIndex) {
  var script = builder.getScript();
  var step = script.getStepWithID(stepID);
  var pName = step.getParamNames()[pIndex];
  if (step.type.getParamType(pName) == "locator") {
    var tdd_id = stepID + '-p' + pIndex + '-locator-type-chooser';
    var typeDropDown = newNode(
      'select',
      {
        id: tdd_id
      }
    );
    
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
    
    var editDiv = newNode(
      'div',
      {
        id: stepID + '-p' + pIndex + '-edit-div'
      },
      typeDropDown,
      ": ",
      newNode('input', {id: stepID + '-p' + pIndex + '-edit-input', type:'text', value: step[pName].getValue()}),
      newNode('a', "OK", {
        id: stepID + '-p' + pIndex + '-OK',
        class: 'button',
        href: '#',
        click: function (e) { okf(); }
      }),
      newNode('div',
        newNode('a', "Find a different target", {
          href: '#',
          click: function() { toggleSearchers(stepID, pIndex); }
        })
      )
    );
    
    for (var k in builder.locator.methods) {
      var lMethod = builder.locator.methods[k];
      if (!lMethod[script.seleniumVersion]) { continue; }
      if (lMethod == step[pName].preferredMethod) {
        jQuery(typeDropDown).append(newNode(
          'option', lMethod[script.seleniumVersion], { selected: "true" }
        ));
      } else {
        jQuery(typeDropDown).append(newNode(
          'option', lMethod[script.seleniumVersion]
        ));
      }
    }
        
    var alternativesList = newNode(
      'ul',
      {
        id: stepID + '-p' + pIndex + '-alternatives-list',
        class: 'b-alternatives'
      }
    );
    var alternativesDiv = newNode(
      'div',
      {
        id: stepID + '-p' + pIndex + '-alternatives-div'
      },
      newNode('p', "Suggested alternatives:"),
      alternativesList
    );
    
    var hasAlts = false;
    for (var altMethod in step[pName].values) {
      if (!step[pName].values[altMethod].length) { continue; }
      if (altMethod != step[pName].preferredMethod || step[pName].values[altMethod].length > 1) {
        hasAlts = true;
        for (var i = 0; i < step[pName].values[altMethod].length; i++) {
          jQuery(alternativesList).append(createAltItem(step, pIndex, pName, builder.locator.methods[altMethod][script.seleniumVersion], step[pName].values[altMethod][i], i));
        }
      }
    }
    
    if (hasAlts) {
      jQuery(editDiv).append(alternativesDiv);
    }
    
    jQuery('#' + stepID + '-p' + pIndex).after(editDiv);
    jQuery('#' + stepID + '-p' + pIndex).hide();
    jQuery('#' + stepID + '-p' + pIndex + '-edit-input').focus().select().keypress(function (e) {
      if (e.which == 13) {
        okf();
      }
    });
  } else {
    function okf() {
      step[pName] = jQuery('#' + stepID + '-p' + pIndex + '-edit-input').val();
      jQuery('#' + stepID + '-p' + pIndex + '-edit-div').remove();
      jQuery('#' + stepID + '-p' + pIndex).show();
      builder.stepdisplay.updateStep(stepID);
      builder.suite.setCurrentScriptSaveRequired(true);
    }
    
    var editDiv = newNode(
      'div',
      {
        id: stepID + '-p' + pIndex + '-edit-div'
      },
      newNode('input', {id: stepID + '-p' + pIndex + '-edit-input', type:'text', value: step[pName]}),
      newNode('a', "OK", {
        id: stepID + '-p' + pIndex + '-OK',
        class: 'button',
        href: '#',
        click: function (e) { okf(); }
      })
    );
    
    jQuery('#' + stepID + '-p' + pIndex).after(editDiv);
    jQuery('#' + stepID + '-p' + pIndex).hide();
    jQuery('#' + stepID + '-p' + pIndex + '-edit-input').focus().select().keypress(function (e) {
      if (e.which == 13) {
        okf();
      }
    });
  }
}