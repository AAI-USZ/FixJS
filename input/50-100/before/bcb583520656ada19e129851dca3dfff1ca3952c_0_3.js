function() {
        var self    = this,
            item    = self.options.model;
        if (! item) { return; }

        self.$el.attr('draggable', true);
        self.$el.html( self.template(item) );

        return self;
    }