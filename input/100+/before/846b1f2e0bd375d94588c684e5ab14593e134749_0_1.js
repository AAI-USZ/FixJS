function(uuid, cb) {
    self.smembers(key, function(members) {
      var isMember = members.some(function(value) {
        return member === value;
      });

      cb.call(self, isMember);
    });


    var osKey = self._sGetMemberKey(key, value);

    getKey(gazel.setsOsName, self.trans, uuid, osKey, function(res) {
      cb(res !== undefined);
    }, self.handleError.bind(self), self);
  }