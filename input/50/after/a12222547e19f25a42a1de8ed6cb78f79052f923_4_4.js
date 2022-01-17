function(threadChildInDB, callback){
                    console.log(threadChildInDB);
                    var subThreadChild = new t.Thread('reReMsg', 'new new author', threadChildInDB);
                    self.repository.insertThread(subThreadChild, callback);
                }