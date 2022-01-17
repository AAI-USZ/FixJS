function(request, response) {
        var params = { q: $('#customer_search').val(),
                       authenticity_token: encodeURIComponent($('meta[name=csrf-token]').attr("content")) }
        $.get(Spree.routes.user_search + '&' + jQuery.param(params), function(data) {
          result = prep_user_autocomplete_data(data)
          response(result);
        });
      }