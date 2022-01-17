function() {
      var form = $(this).parents('form');
      var duration = $('input[name="field_session_duration[und][0][value]"]', form);
      var hours = $('.form-item-field-session-hours-und-0-value input, .form-item-field-session-hours-und-0-value2 input', form);
      if ($(this).is(':checked')) {
        duration.removeAttr('readonly');
        hours.attr('readonly', true);
      }
      else {
        duration.attr('readonly', true);
        hours.removeAttr('readonly');
      }
    }