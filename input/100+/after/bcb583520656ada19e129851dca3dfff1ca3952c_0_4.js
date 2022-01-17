function() {
        var self    = this,
            topic   = self.options.model;
        if (! topic)    { return; }

        var $topic  = $( self.template(topic) );

        self.$el.attr('draggable', true);
        self.$el.empty();
        self.$el.append( $topic );

        self.$header     = self.$el.find('> header');
        self.$title      = self.$header.find('h1');
        self.$titleSpan  = self.$title.find('span');
        self.$titleInput = self.$title.find('input');
        self.$titleInput.parent().hide();

        self.$toggle     = self.$header.find('.toggle');
        self.$controls   = self.$header.find('.curation-controls');
        self.$items      = self.$el.find('> .curation-items');

        self.$items.empty();

        /* Create each page and item individually so we can attach data to
         * each.
         */
        topic.items.forEach(function(item) {
            var view    = new ItemView({model: item});
            
            self.$items.append( view.$el );
        });

        return self;
    }