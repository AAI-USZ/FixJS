function (data) {
        var activity = new Activity(data);

        app.vent.trigger('newactivity', activity);
        app.vent.trigger('newactivity:' + activity.get('Type'), activity);
        // Fire an event for each group the activity belongs to
        _.each(activity.get('Groups'), function (group) {
            this.vent.trigger('newactivity:' + group.Id, activity);
            this.vent.trigger('newactivity:' + group.Id + ':' + activity.get('Type'), activity);
        }, app);
    }