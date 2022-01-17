function(e) {
        console.log("keydown " + e.which);
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
      }