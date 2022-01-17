function(direction) {
    var current = $('.fac-container .fac-item.active');
    if (current.length == 0) {
      if (direction == 'up') {
        $('.fac-container .fac-item:last').addClass('active');
      }
      else {
        $('.fac-container .fac-item:first').addClass('active');
      }
    }
    else {
      current.removeClass('active');

      if (direction == 'up') {
        current.prev().addClass('active');
      }
      else {
        current.next().addClass('active');
      }
    }
  }