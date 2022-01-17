function(ev) {
        var delayed;
        if (delayed !== void 0) {
          clearTimeout(delayed);
        }
        return delayed = setTimeout(function() {
          var searchStr;
          searchStr = $searchInput.val();
          if (searchStr === searchTab.params.s) {
            return;
          }
          searchTab.params.s = searchStr;
          $spinner.insertAfter($searchInput).show();
          return searchTab.find_posts(1);
        }, 400);
      }