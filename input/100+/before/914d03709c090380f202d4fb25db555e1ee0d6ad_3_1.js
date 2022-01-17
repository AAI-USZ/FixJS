function(e) {
        var self    = this,
            $button = $(e.target),
            pos     = $button.position();

        // Present a confirmation mini-dialog
        var confirm = new app.view.MiniDialog({
                        question:   'Delete this topic<br />and all items?',
                        css:        {
                            'z-index':  self.$controls.css('z-index') + 1,
                            'width':    self.$controls.width(),
                            'top':      pos.top,
                            'right':    0
                        },
                        confirmed:  function() {
                            console.log("TopicView::Delete (%s)",
                                        self.options.model.title);
                            self.$el.hide('fast', function() {
                                self.remove();
                            });
                        }
                      });

        self.$header.append( confirm.$el );
    }