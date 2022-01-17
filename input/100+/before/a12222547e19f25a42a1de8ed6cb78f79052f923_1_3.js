function(rootThread, arrayDocs){
        for(var i = 0; i < arrayDocs.length; i++){
            if (arrayDocs[i].parentID && arrayDocs[i].parentID.toString() == rootThread.id){
                var thread = new t.Thread(arrayDocs[i].msgText, arrayDocs[i].author, rootThread);
                thread.id = arrayDocs[i]._id;
                arrayDocs.splice(i,1);
                thread = this.buildTree(thread,arrayDocs);
                rootThread.addChild(thread);
            }
        }
        return rootThread;
    }