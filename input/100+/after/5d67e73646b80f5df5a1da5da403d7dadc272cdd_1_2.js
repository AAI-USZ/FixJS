function(rootThread, docs, callback){
        var self = this;
        var children = [];
        async.forEach(
            docs,
            function(item, callback){
                if (item.parentID && item.parentID.toString() == rootThread.id){
                    var thread = new t.Thread();
                    thread.setFromDoc(item);
                    self.findChildren(thread, docs, function(child){
                        callback();
                    });
                    children.push(thread);
                } else {
                    callback();
                }
            },
            function(error){
                rootThread.child = children;
                callback(rootThread);
            }
        );
    }