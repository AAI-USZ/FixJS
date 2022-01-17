function(thread, callback){
        var self = this;
        async.waterfall([
                function(callback) {
                    self.client.collection('threads', callback);
                },
                function(collection, callback) {
                    collection.insert(thread, callback);
                },
                function(docs, callback) {
                    thread.id = docs[0]._id;
                    callback(null, thread);
                }
            ],
            callback
        );
    }