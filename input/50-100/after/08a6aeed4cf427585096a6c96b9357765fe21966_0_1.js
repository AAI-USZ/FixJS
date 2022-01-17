function(e) {
      e.preventDefault();
      var $target = $(e.target);
      var uri = $target.attr('href') || $target.parent().attr('href');
      window.location.hash = uri;
    }