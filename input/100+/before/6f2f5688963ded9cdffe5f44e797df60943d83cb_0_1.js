function() {
        var basePath = location.origin + location.pathname;

        var searchPage = location.search.match(/page=([0-9])/);
        var currentPage = searchPage ? searchPage[1] : false;

        var queryString = location.search.replace(/(page=)([0-9])/, function(string, query, page) {
          return query + (parseInt(currentPage) + 1);
        });

        if(!currentPage) {
          currentPage = this.pageNumber;
          var pageString = (location.search.length ? "&" : "?") + "page=" + (currentPage + 1);

          queryString = location.search + pageString;
          this.pageNumber = currentPage + 1;
        }

        return basePath + queryString;
      }