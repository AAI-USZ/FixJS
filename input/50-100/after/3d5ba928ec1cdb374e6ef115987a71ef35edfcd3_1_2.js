function (builder, intPage, subset) {
          if (builder) {
            var url = builder(intPage, subset);
            var text = url.substring(url.indexOf('?'));
            ViewsFilter.filtersUrl.attr('href', escapeHTML(url));
            ViewsFilter.filtersUrl.text(decodeURIComponent(text));
            SpatialFilter.filtersUrl.attr('href', escapeHTML(url));
            SpatialFilter.filtersUrl.text(decodeURIComponent(text));
          }
        }