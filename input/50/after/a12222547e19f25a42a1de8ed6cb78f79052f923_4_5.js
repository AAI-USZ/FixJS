function(threadSubChildInDB, callback){
                    console.log(threadSubChildInDB);
                    self.repository.findThreadByID(thread.id, callback);
                }