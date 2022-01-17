function(callback) {
        var self = this;
        async.waterfall([
            function(callback) {
                self.client.collection('threads', callback);
            },
            function(collection, callback) {
                collection.remove({}, callback);
            }
        ],
            callback
        );
    }