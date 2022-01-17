function(threadInDB, callback){
                    thread = threadInDB;
                    var threadChild = new t.Thread('reMsg', 'new author', threadInDB);
                    self.repository.insertThread(threadChild, callback);
                }