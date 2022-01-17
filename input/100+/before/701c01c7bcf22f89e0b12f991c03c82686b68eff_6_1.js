function(evt) {
      var previous_search, search_term;
      evt.preventDefault();
      search_term = search_field.val();
      previous_search = localStorageGet('komoo_search');
      if (!search_term) {
        return;
      }
      cl.show();
      if ((previous_search != null ? previous_search.term : void 0) === search_term) {
        return showResults(previous_search.results);
      } else {
        return $.ajax({
          type: 'POST',
          url: dutils.urls.resolve('komoo_search'),
          data: {
            term: search_term,
            'csrfmiddlewaretoken': csrftoken
          },
          dataType: 'json',
          success: function(data) {
            localStorageSet('komoo_search', {
              term: search_term,
              results: data.result
            });
            return showResults(data.result);
          }
        });
      }
    }