function() {
        var context = this.model.toJSON();
        context = _.extend(context, {
            'participants': Greenmine.participants,
            'statuses': Greenmine.statuses
        });

        this.$el.html(Greenmine.task_template(context));
        this.$el.attr({
            'data-id':this.model.get('id'),
            'id': "task_" + this.model.get('id')
        });
        return this;
    }