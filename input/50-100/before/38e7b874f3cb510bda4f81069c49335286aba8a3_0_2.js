function (collection) {
            this.collection = collection;
            var events = {
                'add remove reset': this.updateList,
                'change': this.updateRow
            };
            _.each(events, function (callback, key) {
                this.collection.off(key, callback, this);
                this.collection.on(key, callback, this);
            }, this);
            this.trigger('collectionChanged', collection);
        }