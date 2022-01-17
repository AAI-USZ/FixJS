function(threadInDB, callback) {
                    console.log(threadInDB.id);
                    self.repository.findThreadByID(threadInDB.id, callback);
                }