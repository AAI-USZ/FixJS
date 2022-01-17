function ($, _, Backbone, app) {

    var ObservationDetailsView = Backbone.Marionette.View.extend({
        template: 'ObservationDetails',

        onShow: function () {
            this._showDetails();
        },

        showBootstrappedDetails: function () {
            //this.$el = $('#content .observation');
        },

        _showDetails: function () {
        }
    });

    return ObservationDetailsView;

}