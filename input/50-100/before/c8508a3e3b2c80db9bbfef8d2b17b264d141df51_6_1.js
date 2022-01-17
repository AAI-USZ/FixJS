function(name, user, cb) {
    _db.set("user:" + name + ":" + user, 1);
    _db.expire("user:" + name + ":" + user, 10, function(){
      count(name, cb);
    });
  }