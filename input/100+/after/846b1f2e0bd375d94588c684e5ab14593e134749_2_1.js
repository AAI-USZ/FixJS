function(uuid, cb) {
    self.smembers(key, function(members) {
      var isMember = members.some(function(value) {
        return member === value;
      });

      cb.call(self, isMember);
    });
  }