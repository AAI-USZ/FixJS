function () {
            _.each(this.collectionEvents, function (callback, key) {
                this.collection.off(key, callback, this);
            }, this);
            Backbone.View.prototype.remove.apply(this, arguments);
        }