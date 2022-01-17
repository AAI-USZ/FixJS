function() {
        var lastPage;
        lastPage = fimo.views.moveBack();
        if (lastPage) {
          return fimo.controller[lastPage]();
        }
      }