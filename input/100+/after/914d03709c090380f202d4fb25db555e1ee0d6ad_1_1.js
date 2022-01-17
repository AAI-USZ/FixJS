function(e) {
        var self    = this,
            $button = $(e.target),
            pos     = $button.position();

        // Present a confirmation mini-dialog
        var confirm = new app.View.MiniDialog({
                        question:   'Delete this item?',
                        css:        {
                            'z-index':  10,
                            'top':      pos.top,
                            'left':     0
                        },
                        confirmed:  function() {
                            console.log("ItemView::Delete (%s)",
                                        self.options.model.id);
                            self.$el.hide('fast', function() {
                                self.remove();
                            });
                        }
                      });

        self.$el.append( confirm.$el );
    }