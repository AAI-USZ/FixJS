function(tag) {
        var view = new Greenmine.TagView({model:tag});
        this.$("#tags-body").append(view.render().el);
    }