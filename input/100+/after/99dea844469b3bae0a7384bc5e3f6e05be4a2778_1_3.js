function(q, password, cb){
    var that = this
    
    that.read(q, function(obj){
      if(obj){
        if(hash.validate(obj.hash, password)){
          var ts = (new Date()).toJSON()
          client.multi()
          .hincrby(namespace +":" + obj.id, "login_count", 1)
          .hset(namespace + ":" + obj.id, "login_at", ts)
          .rpush(namespace + ":" + obj.id + ":logins", ts)
          .ltrim(namespace + ":" + obj.id + ":logins", -100, -1)
          .exec(function(err, replies){
            that.get(obj.id, function(record){
              cb(null, record)
            })
          })
        }else{
          var errors = {
            details: {"password": "is not correct"},
            messages: ["password is not correct"]
          }
          cb(errors, null)
        }
      }else{
        var errors = {
          details: {"account": "is not in the system"},
          messages: ["account is not in the system"]
        }
        cb(errors, null)
      }
    })
  }