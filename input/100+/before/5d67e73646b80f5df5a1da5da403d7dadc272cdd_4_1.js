function(test){
        var self = this;

        var thread = new t.Thread('mainThread','author');
        async.waterfall([
                function(callback) {
                    self.repository.insertThread(thread, callback);
                },
                function(threadInDB, callback) {
                    self.repository.findThreadByID(threadInDB.id, callback);
                },
                function(threadFound, callback) {
                    console.log(threadFound);
                    test.equals(threadFound.msgText, thread.msgText);
                    test.equals(threadFound.parents.length, 0);
                    callback();
                }
            ],
            test.done
        );
    }