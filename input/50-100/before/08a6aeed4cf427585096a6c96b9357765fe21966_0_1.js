function(e) {
      e.preventDefault();
      window.location.hash = $(e.target).attr('href');
    }