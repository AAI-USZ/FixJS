function() {
        var self    = this;

        self.$el.data('view', self);

        /* Add 'dragover' at the document level to allow dropping at any
         * location within the sidebar
         */
        $(document).on('dragover', _.bind(self.dragOver, self));

        // Cache element references
        self.$topicInput = self.$el.find('.new-topic');
        self.$topics     = self.$el.find('.curation-topics');

        // Listen for 'message' events from the addon.
        addon.on('message', self.addonMessage.bind(self));

        if (self.options.model)
        {
            // We've been given data directly, render immediately.
            self.render();
        }
        else
        {
            /* We've not been given any data to render.
             *
             * Notify the addon that we're ready and wait for data to render.
             */
            addon.postMessage({
                src:    'sidebar-content',
                action: 'loaded',
                url:    'js/topics-sidebar.js'
            });
        }
    }