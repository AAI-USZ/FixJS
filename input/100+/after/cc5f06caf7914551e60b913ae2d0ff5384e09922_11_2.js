function ($, _, Backbone, app, StreamView, ActivityCollection) {

    var HomePrivateLayoutView = Backbone.Marionette.Layout.extend({
        className: 'home',

        template: 'Home',

        regions: {
            summary: '.summary',
            details: '.details'
        },

        showBootstrappedDetails: function () {
            this.initializeRegions();
            this.$el = $('#content .home');
        },

        showStream: function () {
            var activityCollection = new ActivityCollection();
            var options = {
                model: app.authenticatedUser.user,
                collection: activityCollection,
                isHomeStream: true
            };

            if (app.isPrerendering('home')) {
                options['el'] = '.stream';
            }

            var streamView = new StreamView(options);

            if (app.isPrerendering('home')) {
                this.details.attachView(streamView);
                streamView.showBootstrappedDetails();
            } else {
                this.details.show(streamView);
            }

            activityCollection.fetchFirstPage();
        }
    });

    return HomePrivateLayoutView;

}