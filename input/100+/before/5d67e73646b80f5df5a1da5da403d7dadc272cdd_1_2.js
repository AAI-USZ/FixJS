function(item, callback){
                if (item.parentID && item.parentID.toString() == rootThread.id){
                    var thread = new t.Thread();
                    thread.setFromDoc(item);
                    thread = self.buildTree(thread,arrayDocs);
                    rootThread.addChild(thread);
                }
                callback();
            }