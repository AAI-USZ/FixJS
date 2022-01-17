function() {
      var select = function(item) {
        if (item.length > 0) {
          $(self.input).trigger('selected', item.data('facebook-id'));
          self.dismissHints();
        }
      };

      $(self.input).on('input', function(e) { self.search($(self.input).val()); });
      $(self.input).on('keydown', function(e) {
        if (e.which == 40) { // Down arrow
          self.moveSelection('down');
        }
        else if (e.which == 38) { // Up arrow
          self.moveSelection('up');
        }
        else if (e.which == 13) { // Enter/return
          var active = $(self.containerSelector + ' .fac-item.active');
          select(active);
        }
        else if (e.which == 27) {
          self.dismissHints();
        }
      });

      self.appendStyle();
      $(self.containerSelector).remove();
      $('body').append('<div class="fac-container" id="' + self.containerId + '"></div>');
      $(self.containerSelector + ' .fac-item').live('mouseenter', function() {
        var current = $(self.containerSelector + ' .fac-item.active');
        current.removeClass('active');
        $(this).addClass('active');

        self.hoveringOnHint = true;
      });

      $(self.containerSelector + ' .fac-item').live('mouseleave', function() {
        self.hoveringOnHint = false;
      });

      $(self.containerSelector + ' .fac-item').live('click', function() {
        select($(this));
      });

      $(self.input).focusout(function() {
        if (self.hoveringOnHint) {
          return;
        }

        self.dismissHints();
      });

      $(self.input).focusin(function() {
        self.search($(self.input).val());
      });
    }