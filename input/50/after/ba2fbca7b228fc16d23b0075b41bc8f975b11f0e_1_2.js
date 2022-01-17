function(e) {
          $(this).addClass(self.options.classes.changed);
          $(this.form).triggerHandler(self.options.events.changed, [this]);
        }