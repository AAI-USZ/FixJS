function(id, callback){
        var self = this;

        async.waterfall(
            [
                function(callback){
                    self.client.collection('threads', callback);
                },
                function(collection, callback){
                    collection.find({$or: [{_id: new ObjectID(id)}, {parentID: id}, {parents: id}]}, {}, callback);
                },
                function(cursor, callback){
                    cursor.toArray(callback);
                },
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
            ],
            callback
        );
    }