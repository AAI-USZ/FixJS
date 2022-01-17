function(e) {
        var self    = this;

        console.log("ItemView::visitItem(): item[ %s ]",
                    JSON.stringify(self.options.model));

        e.preventDefault();
        e.stopPropagation();

        // Request a visit to the target href.
        addon.postMessage({
            src:        'sidebar-content',
            action:     'visit',
            url:        self.options.model['url'],
            location:   self.options.model['location'],
            selector:   '',
            current:    (! e.metaKey)
        });
    }