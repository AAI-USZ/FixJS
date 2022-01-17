function(docs){
                    console.log(docs);
                    for(var i = 0; i < docs.length; i++){
                        if (docs[i]._id.toString() == id){
                            var thread = new t.Thread(docs[i].msgText, docs[i].author);
                            thread.id = id;
                            docs.splice(i, 1);
                            thread = self.buildTree(thread,docs);
                            callback(null, thread);
                            break;
                        }
                    }
                }