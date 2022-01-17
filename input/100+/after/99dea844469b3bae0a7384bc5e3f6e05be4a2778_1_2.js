function(err, old){
      client.multi()
      .del(namespace + ":email:" + old.email)
      .del(namespace + ":uuid:" + old.uuid)
      .hmset(key, obj)
      .set(namespace + ":email:" + obj.email, obj.id)
      .set(namespace + ":uuid:" + obj.uuid, obj.id)
      .zadd(namespace + ":collection:role", obj.role, obj.id)
      .zadd(namespace + ":collection", (new Date(obj.created_at).getTime()), obj.id)
      .exec(function(err, replies){
        if(!err) cb(obj)
      })
    }