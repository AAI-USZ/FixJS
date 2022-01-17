function(v){
                    db.tags.update({n:v._id}, {$set:{c:v.value}}, {'upsert':1});
                }