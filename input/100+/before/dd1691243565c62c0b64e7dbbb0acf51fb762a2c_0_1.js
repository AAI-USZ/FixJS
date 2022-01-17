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
          var active = $('.fac-container .fac-item.active');
          select(active);
        }
        else if (e.which == 27) {
          self.dismissHints();
        }
      });

      self.appendStyle();
      $('body').append('<div class="fac-container"></div>');
      $('.fac-container .fac-item').live('mouseenter', function() {
        var current = $('.fac-container .fac-item.active');
        current.removeClass('active');
        $(this).addClass('active');
      });

      $('.fac-container .fac-item').live('click', function() {
        select($(this));
      });

      $(self.input).focusout(function() {
        self.dismissHints();
      });

      $(self.input).focusin(function() {
        self.search($(self.input).val());
      });
    }