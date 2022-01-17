function() {
        _.bindAll(this, 'render');
        this.collection.bind('reset', this.render);
        this.collection.bind('add', this.render);
        this.collection.bind('remove', this.render);
        this.collection.bind('change:ps', this.render);
        this.collection.bind('change:nt', this.render);
        this.collection.bind('change:ng', this.render);
    }