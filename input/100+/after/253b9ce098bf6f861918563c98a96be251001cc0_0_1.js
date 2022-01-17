function(searchTerm) {
    $('#search-progress').show();
    if (!grinfit.searchCache) {
      setTimeout(doSearch,200);
    }

    var term = $.trim(searchTerm.toLowerCase()),
        regex = new RegExp(term, 'im');
        results = []
        i = 0;

    if (term) {
      if (term != grinfit.lastSearchTerm) {
        grinfit.lastSearchTerm = term;
        for (i in grinfit.searchCache) {
          var post = grinfit.searchCache[i];
          if (regex.test(post.title) || regex.test(post.contentClean)) {
            results.push(post);
          }
        }

        $('#posts').hide();
        $('#search-results').html('').show();
        last = $(results).size() - 1;
        for (i in results) {
          var post = results[i];
          $('#search-results').append(post.content + (i < last ? '<hr/>' : ''));
        }
        $('#search-results .js-start-hidden').hide();
      }
    }
    else {
      $('#search-results').hide();
      $('#posts').show();
    }
    $('#search-progress').hide();
  }