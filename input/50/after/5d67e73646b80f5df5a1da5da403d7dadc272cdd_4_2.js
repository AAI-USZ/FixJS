function(threadInDB, callback){
                thread = threadInDB;
                var threadChild = new t.Thread('reMsg', 'new testThreadSaveTree', threadInDB);
                self.repository.insertThread(threadChild, callback);
            }