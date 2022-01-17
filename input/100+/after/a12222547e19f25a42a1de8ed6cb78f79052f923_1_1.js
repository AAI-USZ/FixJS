function(docs ,callback){

                    console.log(id);
                    console.log(docs);
                    var thread;
                    for(var i = 0; i < docs.length; i++){
                        if (docs[i]._id.toString() == id.toString()){
                            thread = new t.Thread();
                            thread.setFromDoc(docs[i]);
                            docs.splice(i, 1);
                            thread = self.buildTree(thread,docs);
                            break;
                        }
                    }
                    callback(null, thread);
                }