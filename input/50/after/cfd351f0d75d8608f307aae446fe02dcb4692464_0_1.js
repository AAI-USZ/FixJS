function() {
        var current = $(self.containerSelector + ' .fac-item.active');
        current.removeClass('active');
        $(this).addClass('active');

        self.hoveringOnHint = true;
      }