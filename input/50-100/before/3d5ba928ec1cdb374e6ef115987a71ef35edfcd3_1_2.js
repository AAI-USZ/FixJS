function (builder, intPage, subset) {
          var html="";
          if (builder) {
            var url = builder(intPage, subset);
            var text = url.substring(url.indexOf('?'));
            html = "<a href='" + escapeHTML(url) + "'>" + escapeHTML(decodeURIComponent(text)) + '</a>';
          }
          $('.view_query_string').html(html);
        }