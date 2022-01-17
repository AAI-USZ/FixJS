function(e) {
            $(this).addClass(self.options.classes.modified);
            $(this.form).triggerHandler(self.options.events.modified, this);
        }