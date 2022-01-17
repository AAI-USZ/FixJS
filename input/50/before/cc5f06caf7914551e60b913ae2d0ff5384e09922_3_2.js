function (data) {
        log('activityController.newActivity', this, data);
        // TODO: Maybe add another collection that only contains your membership activities for the notification list
        app.activities.add(data);
    }