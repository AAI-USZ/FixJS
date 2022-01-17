function() {
        var self    = this;

        // Cache element references
        self.$topicInput = self.$el.find('.new-topic');
        self.$topics     = self.$el.find('.curation-topics');

        if (self.options.model)
        {
            // Trigger an initial rendering
            self.render();
        }
    }