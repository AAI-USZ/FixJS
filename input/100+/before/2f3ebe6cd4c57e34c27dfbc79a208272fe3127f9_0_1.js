function() {
        var context = this.model.toJSON();
        context = _.extend(context, {
            'participants': Greenmine.participants,
            'statuses': Greenmine.statuses
        });

        console.log(Greenmine.statuses);
        console.log(context);

        this.$el.html(Greenmine.taskTemplate(context));
        this.$el.attr('id', 'task-' +  this.model.get('id'));
        this.$el.attr('data-id',  this.model.get('id'));
        this.$el.attr('data-status', this.model.get('status'));
        return this;
    }