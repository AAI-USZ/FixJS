function(lastLetter) {
    Search.searching = true;
    var term = $('#search-text').val();
    if(term.length < 2) { return false };

    if(term != Search.currentSearch) {
      Search.currentSearch = term;
      $.get("/search", {search: term}, function(results) {
        $("#search-results").html(results);
      }, 'html');
    };
  }