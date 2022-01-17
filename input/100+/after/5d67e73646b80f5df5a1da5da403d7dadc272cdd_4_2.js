function(test){
        var self = this;
        var thread = new t.Thread('msg', 'testThreadSaveTree');
        async.waterfall([
            function(callback){
                self.repository.insertThread(thread, callback);
            },
            function(threadInDB, callback){
                thread = threadInDB;
                var threadChild = new t.Thread('reMsg', 'new testThreadSaveTree', threadInDB);
                self.repository.insertThread(threadChild, callback);
            },
            function(threadChildInDB, callback){
                test.equals(threadChildInDB.parentID, thread.id);
                callback();
            }
        ],
        test.done
        );
    }