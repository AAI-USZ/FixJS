function(test){
        var self = this,
            thread = new t.Thread('msg', 'author');

        async.waterfall(
            [
                function(callback){
                    self.repository.insertThread(thread, callback);
                },
                function(threadInDB, callback){
                    thread = threadInDB;
                    var threadChild = new t.Thread('reMsg', 'new author', threadInDB);
                    self.repository.insertThread(threadChild, callback);
                },
                function(threadChildInDB, callback){
                    var subThreadChild = new t.Thread('reReMsg', 'new new author', threadChildInDB);
                    self.repository.insertThread(subThreadChild, callback);
                },
                function(threadSubChildInDB, callback){
                    self.repository.findThreadByID(thread.id, callback);
                },
                function(threadTree, callback){
                    test.equals(threadTree.getChild(0).getChildCount(), 1);
                    callback();
                }
            ],
            test.done
        );
    }