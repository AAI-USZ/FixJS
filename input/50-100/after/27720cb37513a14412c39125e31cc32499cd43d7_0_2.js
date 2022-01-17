function(tag) {
        var view = new Greenmine.MilestoneView({model:tag});
        this.$("#milestones-body").append(view.render().el);
    }