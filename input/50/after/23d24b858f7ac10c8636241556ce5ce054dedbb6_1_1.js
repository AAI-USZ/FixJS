function(model) {
        var self    = this;

        log("TopicView::setModel(): topic[ %s ], %d items",
                model.title, model.items.length);

        self.options.model = model;

        self.render();

        return self;
    }