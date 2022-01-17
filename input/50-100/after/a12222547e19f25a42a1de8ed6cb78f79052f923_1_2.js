function(collection, callback){
                    collection.find({$or: [{_id: new ObjectID(id)}, {parentID: new ObjectID(id)}, {parents: id}]}, {}, callback);
                }