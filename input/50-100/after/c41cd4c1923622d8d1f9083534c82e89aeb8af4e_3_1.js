function(e) {
          jQuery('#' + step.id + '-p' + pIndex + '-locator-type-chooser').val(altName);
          jQuery('#' + step.id + '-p' + pIndex + '-edit-input').val(altValue);
          jQuery('#' + step.id + '-p' + pIndex + '-edit-input').data('alt', altIndex);
        }