function (groupId, activityData) {
        var activity = new Activity(activityData);

        app.vent.trigger('newactivity', activity);
        app.vent.trigger('newactivity:' + activity.get('Type'), activity);
        app.vent.trigger('newactivity:' + groupId, activity);
        app.vent.trigger('newactivity:' + groupId + ':' + activity.get('Type'), activity);
    }