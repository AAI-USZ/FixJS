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
        for (i in results) {
          var post = results[i];
          $('#search-results').append(post.content + '<hr/>'
//            '<article><a class="date clearfix" href="' + post.url + '">' + post.date + '</a>' + 
//            '<h1><a class="js-collapse">' + post.title + '</a></h1>' + 
//            '<div class="content js-start-hidden">' + post.content + '</div>' +
//            '</article><hr/>'
          );
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