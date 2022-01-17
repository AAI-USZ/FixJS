function () {
        // Override the marionette renderer so that it uses mustache templates 
        // together with icanhaz caching
        Backbone.Marionette.Renderer.render = function (template, data) {
            if (template) { // Marionette seems to call this method even if a view is created with a pre-existing DOM element. May need to investigate further.
                return ich[template](data);
            }
        };

        // Add additional capability if authenticated user
        if (bootstrapData.AuthenticatedUser) {
            // Add the authenticated user to the app for future reference
            app.authenticatedUser = new AuthenticatedUser(bootstrapData.AuthenticatedUser);

            // Online users
            app.onlineUsers = new UserCollection();

            // Chats
            app.chats = new ChatCollection();
            app.chatRegions = [];

            // Notifications
            app.activities = new ActivityCollection();

            // Subscribe to new activities
            app.activities.on(
                    'add',
                    function (activity) {
                        this.vent.trigger('newactivity', activity);
                        this.vent.trigger('newactivity:' + activity.get('Type'), activity);
                        // Fire an event for each group the activity belongs to
                        _.each(activity.get('Groups'), function (group) {
                            this.vent.trigger('newactivity:' + group.Id);
                        }, app);
                    },
                    this);
        }

        // Add the prerendered view string to the app for use by controller duing init of first view
        app.prerenderedView = {
            name: bootstrapData.PrerenderedView,
            isBound: false, // Flag used to determine if prerenderd view has been bound to the object/DOM model
            data: bootstrapData.Model
        };
    }