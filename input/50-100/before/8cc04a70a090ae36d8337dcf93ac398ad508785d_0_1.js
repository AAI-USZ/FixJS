function(ev) {
      if (ev.which == 13 && $(this).val()) {
        $('#status-form').submit();
      }
    }