function(obj, cb){
    if(obj.id){
      // existing
      var key = namespace + ":" + obj.id
      client.hgetall(key, function(err, old){
        client.multi()
        .del(namespace + ":email:" + old.email)
        .del(namespace + ":uuid:" + old.uuid)
        .hmset(key, obj)
        .set(namespace + ":email:" + obj.email, obj.id)
        .set(namespace + ":uuid:" + obj.uuid, obj.id)
        .zadd(namespace + ":collection:role", obj.role, obj.id)
        .exec(function(err, replies){
          if(!err) cb(null, obj)
        })
      })
    }else{
      // new
      var date = new Date()
      var timestamp = date.getTime()

      var chars = "0123456789abcdefghiklmnopqrstuvwxyz".split("")
      var code  = "xxxx".replace(/[x]/g, function(c){ 
        return chars[Math.floor(Math.random() * chars.length)]
      })
      // lets set a human readable id for new accounts
      // these should remain 9 bits until around year 2056
      // not perfect but better than auto-inc or uuid IMHO
      var aid = timestamp
        .toString(36)
        .split("")
        .reverse()
        .join("")
        .match(RegExp('.{1,4}', 'g'))
        .reverse()
      aid.push(code)
      obj.id = aid.join("-")

      // use same timestamp for created_at
      obj.created_at = date.toJSON()

      var key = namespace + ":" + obj.id;
      client.multi()
      .hmset(key, obj)
      .set(namespace + ":uuid:" + obj.uuid, obj.id)
      .set(namespace + ":email:" + obj.email, obj.id)
      .zadd(namespace + ":collection:role", obj.role, obj.id)
      .zadd(namespace + ":collection", timestamp, obj.id)
      .exec(function(err, replies){
        if(!err) cb(null, obj)
      })
    }
  }