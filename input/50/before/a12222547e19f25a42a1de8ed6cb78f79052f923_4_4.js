function(threadChildInDB, callback){
                    var subThreadChild = new t.Thread('reReMsg', 'new new author', threadChildInDB);
                    self.repository.insertThread(subThreadChild, callback);
                }