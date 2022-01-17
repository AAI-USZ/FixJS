function(dataset) {
        this.dataset = dataset;
        this.edit_view.reset(dataset);
        this.related_stories_view.reset(dataset);
    }