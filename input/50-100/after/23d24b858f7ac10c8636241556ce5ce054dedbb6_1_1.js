function(model) {
        var self    = this;

        log("TopicsView::setModel(): %d topics", model.length);

        self.options.model = model;

        self.render();

        return self;
    }