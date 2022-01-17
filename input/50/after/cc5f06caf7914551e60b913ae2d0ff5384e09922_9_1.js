function () {
            // returns JSON containing all data for view
            return Backbone.Model.prototype.toJSON.apply(this, arguments);
        }