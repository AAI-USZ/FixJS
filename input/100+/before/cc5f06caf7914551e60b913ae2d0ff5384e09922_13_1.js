function () {
            // Only show notifications if user is authenticated
            if (app.authenticatedUser) {
                // Render the layout and get it on the screen, first
                var notificationsCompositeView = new NotificationsCompositeView({ model: app.authenticatedUser.user, collection: app.activities });

                notificationsCompositeView.on('show', function () {
                    app.vent.trigger('notifications:rendered');
                });

                app.notifications.show(notificationsCompositeView);
            }
        }