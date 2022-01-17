function ($, _, Backbone, app) {

    var ObservationDetailsView = Backbone.Marionette.ItemView.extend({
        className: 'observation-details',

        template: 'ObservationDetails',

        serializeData: function () {
            var json = { Model: { Observation: this.model.toViewJSON() } };
            json.Model.ShowThumbnails = this.model.get('Media').length > 1 ? true : false;
            return json;
        },

        onShow: function () {
            this._showDetails();
        },

        showBootstrappedDetails: function () {
            this._showDetails();
        },

        _showDetails: function () {

        }
    });

    return ObservationDetailsView;

}