function ($, _, Backbone, app, StreamView, StreamItemCollection) {

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
            var streamItemCollection = new StreamItemCollection();
            var options = {
                model: app.authenticatedUser.user,
                collection: streamItemCollection,
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

            streamItemCollection.fetchFirstPage();
        }
    });

    return HomePrivateLayoutView;

}