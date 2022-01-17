function(done) {
        var self = this;
        this.repository = new r.Repository();
        async.waterfall([
            function(callback) {
                self.repository.open(callback);
            },
            function (callback) {
                self.repository.removeAllThreads(callback);
            }
        ],
        done);
    }