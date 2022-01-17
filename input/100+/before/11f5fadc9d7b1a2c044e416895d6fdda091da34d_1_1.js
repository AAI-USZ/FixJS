function() {
        _.bindAll(this, 'mouseleave', 'mouseenter');
        this.model.bind('change', this.toggle_classes, this);
        this.model.bind('change:read_status', this.toggle_read_status, this);
        this.model.bind('change:selected', this.toggle_selected, this);
        this.model.bind('change:starred', this.toggle_starred, this);
        this.model.bind('change:intelligence', this.render_header, this);
        
        // Binding directly instead of using event delegation. Need for speed.
        // this.$el.bind('mouseenter', this.mouseenter);
        // this.$el.bind('mouseleave', this.mouseleave);
        
        if (!this.options.feed_floater) {
            this.model.story_view = this;
        }
    }