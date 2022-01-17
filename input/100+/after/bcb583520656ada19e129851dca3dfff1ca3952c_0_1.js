function() {
        var self    = this;

        self.$el.data('view', self);

        /* Add a document-level 'dragover' handler to allow dropping at any
         * location within the sidebar
         */
        $(document).on('dragover', _.bind(self.dragOver, self));

        /* Add a document-level 'drop' handler to take care of 'drop' events
         * that have been proxied to the sidebar document via
         * sbDndProxy()/sbDrop() in the sidebar addon as 'dropExternal' events
         * -- most likely because an item was dropped on the splitter while the
         * sidebar was closed.
         */
        $(document).on('dropExternal', _.bind(self.dragDrop, self));

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