function ($, _, Backbone, Activity) {

    var ActivityCollection = Backbone.Collection.extend({
        model: Activity,

        initialize: function () {
            _.extend(this, Backbone.Events);
        }
    });

    return ActivityCollection;

}