function() {
          console.log("Triggering step_shown");
          $(this.element).trigger('step_shown', this._state());
        }