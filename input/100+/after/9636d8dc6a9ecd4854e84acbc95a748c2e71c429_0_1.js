function validateSearch(inputs) {
    var ok = $('#search-box input:[value=""]').length != inputs.length;

    if (ok) {
      var obj = {};
      $(inputs).each(function(i,e) {
        if (e.value) obj[e.name] = e.value;
      });
      searchSpinner = startSpinner($('#results').get(0));
      $('#lastQuery').val($('#q').val().trim());
      $('#advanced-search').fadeOut();
      $.bbq.removeState();
      $.bbq.pushState(obj);
    }
    
    return ok;
  }