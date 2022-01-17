function() {
        var lastPage;
        lastPage = fimo.views.moveBack();
        if (lastPage && fimo.controller[lastPage]) {
          return fimo.controller[lastPage]();
        }
      }