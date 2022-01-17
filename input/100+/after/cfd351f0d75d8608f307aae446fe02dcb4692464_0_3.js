function(direction) {
    var current = $(this.containerSelector + ' .fac-item.active');
    if (current.length == 0) {
      if (direction == 'up') {
        $(this.containerSelector + ' .fac-item:last').addClass('active');
      }
      else {
        $(this.containerSelector + ' .fac-item:first').addClass('active');
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