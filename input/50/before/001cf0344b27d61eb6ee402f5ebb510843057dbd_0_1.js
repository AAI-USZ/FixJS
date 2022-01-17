function(i, value) {
        select.find('option[value=' + value + ']').attr('disabled', true);
      }