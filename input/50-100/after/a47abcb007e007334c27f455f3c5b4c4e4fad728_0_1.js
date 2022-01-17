function() {
        _.bindAll(this, 'render', 'defer_render');
        this.collection.bind('reset', this.defer_render);
        this.collection.bind('add', this.defer_render);
        this.collection.bind('remove', this.defer_render);
        this.collection.bind('change:ps', this.defer_render);
        this.collection.bind('change:nt', this.defer_render);
        this.collection.bind('change:ng', this.defer_render);
    }