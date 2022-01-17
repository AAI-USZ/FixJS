function() {
        var context = this.model.toJSON();
        context = _.extend(context, {
            'participants': Greenmine.participants,
            'statuses': Greenmine.statuses
        });

        this.$el.html(Greenmine.taskTemplate(context));
        this.$el.attr('id', 'task-' +  this.model.get('id'));
        this.$el.attr('data-id',  this.model.get('id'));
        this.$el.attr('data-status', this.model.get('status'));
        return this;
    }