function(client) {

  var account = new Thug({
    "locals": {
      "namespace": "account",
      "client": client
    },
    "filters": {
      "in": [
        filters.blacklist
      ],
      "before": [
        filters.id,
        filters.uuid, 
        filters.hash, 
        filters.role
      ],
      "after": [
        filters.login_at, 
        filters.login_count,
        filters.updated_at,
        filters.created_at
      ],
      "out": [
        filters.clean
      ]
    },
    "validations": {
      "email"   : [validations.present, validations.email, validations.unique]
    }
  })
  
  // Read the Record
  // - takes an `id`
  // - must fire callback with the record or `null`
  account.constructor.prototype.read = function(q, cb){
    // once done
    var callback = function(err, obj){
      for(var key in obj) break;
      key ? cb(obj) : cb(null)
    }

    if(typeof q == 'object'){
      for(var key in q) break;
      client.get(namespace + ":" + key + ":" + q[key], function(err, id){
        client.hgetall(namespace + ":" + id, callback)
      })
    }else{
      client.hgetall(namespace + ":" + q, callback)
    }
  }
  
  // Write the Record
  // - must fire callback with errors or the record
  account.constructor.prototype.write = function(identifier, obj, cb){
    var key = namespace + ":" + obj.id
    client.hgetall(key, function(err, old){
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
    })
  }

  account.constructor.prototype.all = function(start, stop, cb){
    var that = this
    client.zrevrange(namespace + ":collection", start, stop, function(err, reply){
      var total = reply.length
      var count = 0
      var transaction = client.multi()
      reply.forEach(function(id){
        transaction.hgetall(namespace + ":" + id)
      })
      transaction.exec(function(err, replies){
        replies.forEach(function(obj){
          that.out(obj, function(record){
            count++
            if(count == total){
              cb(replies)
            } 
          })
        })
      })
    })
  }

  account.constructor.prototype.group = function(role, cb){
    var that = this
    client.zrevrangebyscore(namespace + ":collection:role", role, role, function(err, reply){
      if(err){
        cb([])
      }else{
        var transaction = client.multi()
        reply.forEach(function(id){
          transaction.hgetall(namespace + ":" + id)
        })
        transaction.exec(function(err, replies){
          var total = replies.length
          var count = 0
          if(total == 0){
            cb([])
          }else{
            replies.forEach(function(obj){
              that.out(obj, function(record){
                count++
                if(count >= total){
                  cb(replies)
                } 
              })
            })
          }
        })
      }
    })
  }
  
  account.constructor.prototype.authenticate = function(q, password, cb){
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
  
  return account
}