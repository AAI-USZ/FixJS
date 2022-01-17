function ($, _, Backbone, app, ObservationFormLayoutView) {

    var ObservationLayoutView = Backbone.Marionette.Layout.extend({
        className: 'observation',

        template: 'Observation',

        regions: {
            main: '.main',
            notes: '.notes',
            comments: '.comments'
        },

        showBootstrappedDetails: function () {
            this.initializeRegions();
            this.$el = $('#content .observation');
        },

        showObservationDetails: function (observation) {
            
        },

        showObservationForm: function (observation, categories) {
            var options = { model: observation, categories: categories };

            if (app.isPrerendering('observations')) {
                options['el'] = '.observation-form';
            }

            var observationFormLayoutView = new ObservationFormLayoutView(options);
            this.main[app.getShowViewMethodName('observations')](observationFormLayoutView);

            if (app.isPrerendering('observations')) {
                observationFormLayoutView.showBootstrappedDetails();
            }
        }
    });

    return ObservationLayoutView;

}