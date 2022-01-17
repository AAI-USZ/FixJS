function(docs){
                    var thread;
                    for(var i = 0; i < docs.length; i++){
                        if (docs[i].parentID == null){
                            thread = new t.Thread(docs[i].msgText, docs[i].author);
                            thread.id = docs[i]._id;
                            docs.splice(i, 1);
                            thread = self.buildTree(thread,docs);
                            break;
                        }
                    }
                    callback(null, thread);
                }