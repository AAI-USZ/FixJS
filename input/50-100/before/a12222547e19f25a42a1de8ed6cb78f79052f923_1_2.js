function(collection, callback){
                    collection.find({$or: [{_id: new ObjectID(id)}, {parentID: id}, {parents: id}]}, {}, callback);
                }