function (options) {
        // Only show notifications if user is authenticated
        if (app.authenticatedUser) {
            // Setup activity event listening
            var activityCollection = new ActivityCollection();
            activityCollection.baseUrl = '/notifications';
            app.vent.on('newactivity', function (activity) {
                activityCollection.add(activity);
            });

            var notificationsCompositeView = new NotificationsCompositeView({ model: app.authenticatedUser.user, collection: activityCollection });

            notificationsCompositeView.on('show', function () {
                app.vent.trigger('notifications:rendered');
            });

            app.notifications.show(notificationsCompositeView);

            activityCollection.fetchFirstPage();
        }
    }