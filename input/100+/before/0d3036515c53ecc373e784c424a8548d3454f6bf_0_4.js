function(event){
      var filter = $(this).attr('checkbox_name_filter');
      var checkboxes;
      if (filter) {
        checkboxes = $(this).closest('fieldset').find('input[name*="' + filter + '"][type="checkbox"]');
      } else {
        checkboxes = $(this).closest("fieldset").find(':checkbox');
        if (checkboxes.length == 0) { checkboxes = $(this).closest("fieldset").next().find(':checkbox'); }
      }
      checkboxes.attr('checked', false);
      event.preventDefault();
    }