function(form) {
      $('#results').empty();
      searchSpinner = startSpinner($('#results').get(0));
      $('#lastQuery').val($('#q').val().trim());
    }