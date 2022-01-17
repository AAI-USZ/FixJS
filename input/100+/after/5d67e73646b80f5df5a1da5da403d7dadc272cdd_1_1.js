function(docs ,callback){
                    var thread;
                    async.forEach(
                        docs,
                        function(item, callback){
                            if (item._id.toString() == id){
                                thread = new t.Thread();
                                thread.setFromDoc(item);
                                self.findChildren(thread, docs, function(child){
                                    callback();
                                });
                            } else {
                                callback();
                            }
                        },
                        function(error){
                            callback(null, thread);
                        }
                    );
                }