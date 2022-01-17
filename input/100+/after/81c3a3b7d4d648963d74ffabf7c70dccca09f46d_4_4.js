function(event) {
      // ignore key presses in input fields
      if ($('input[type="text"]:focus, textarea:focus').length === 0) {
        // if the user hit backspace and has an element/component focused, remove it
        if (event.which === 8) {
          if (this.layoutView.$activeElement) {
            this.layoutView.trigger('removeElement');
          } else if (this.layoutView.$activeComponent) {
            this.layoutView.resetComponentElement(this.layoutView.$activeComponent);
          }
          event.preventDefault();
        }

        // if the user hit escape, reset the active element
        if (event.which === 27) {
          this.layoutView.resetActiveElement();
        }

        // if the user hit tab, make sure he/she focuses something in the main
        // content area and not the sidebar
        if (event.which === 9) {
          // since content dynamically changes, just add the tabIndex attribute
          // whenever tab is pressed
          $('#sidebar').find('a, input, select, button').attr('tabIndex', -1);
        }
      }
    }