function(rootThread, arrayDocs){
        var self = this;
        async.forEach(
            arrayDocs,
            function(item, callback){
                if (item.parentID && item.parentID.toString() == rootThread.id){
                    var thread = new t.Thread();
                    thread.setFromDoc(item);
                    thread = self.buildTree(thread,arrayDocs);
                    rootThread.addChild(thread);
                }
                callback();
            },
            function(error){
                return rootThread;
            }
        );
//        for(var i = 0; i < arrayDocs.length; i++){
//            if (arrayDocs[i].parentID && arrayDocs[i].parentID.toString() == rootThread.id){
//                var thread = new t.Thread();
//                thread.setFromDoc(arrayDocs[i]);
//                arrayDocs.splice(i, 1);
//                thread = this.buildTree(thread,arrayDocs);
//                rootThread.addChild(thread);
//            }
//        }
//        return rootThread;
    }