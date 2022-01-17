function() {
        this.$el.html(Greenmine.template(this.model.toJSON()));
        this.$el.attr({
            'data-id':this.model.get('id'),
            'id': "task_" + this.model.get('id')
        });
        return this;
    }