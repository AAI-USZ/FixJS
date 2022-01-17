function(docs){
                    var thread;

                    async.forEach(
                        docs,
                        function(item, callback){
                            if (item.parentID == null){
                                thread = new t.Thread(item.msgText, item.author);
                                thread.setFromDoc(item);
                                self.findChildren(thread, docs, function(child){
                                    callback();
                                });
                            } else {
                                callback();
                            }
                        },
                        function(error){
                            if (thread){
                                callback(null, thread);
                            } else {
                                callback("nobody");
                            }
                        }
                    );
                }