function(docs){
                    for(var i = 0; i < docs.length; i++){
                        if (docs[i].parentID == null){
                            var thread = new t.Thread(docs[i].msgText, docs[i].author);
                            thread.id = docs[i]._id;
                            docs.splice(i, 1);
                            thread = self.buildTree(thread,docs);
                            callback(null, thread);
                            break;
                        }
                    }
                    callback(-1);
                }