function(threadInDB, callback){
                    thread = threadInDB;
                    console.log(threadInDB);
                    var threadChild = new t.Thread('reMsg', 'new author', threadInDB);
                    self.repository.insertThread(threadChild, callback);
                }