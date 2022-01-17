function(type, action, callback) {
    var uuid, self = this;

    if(this.needsOsVerification) {
      ensureObjectStore(this.osName, function() {
        self.needsOsVerification = false;

        self.register(type, action, callback);
      });

      return;
    }

    if(this.inMulti) {
      uuid = this.transMap.get(type);
      if(!uuid) {
        uuid = this.trans.add();
        this.transMap.set(type, uuid);
      }

      this.chain.push({
        uuid: uuid,
        action: action
      });

      return;
    }

    uuid = self.trans.add();

    action(uuid, function() {
      var args = slice.call(arguments);

      self.trans.del(uuid);

      (callback || function() { }).apply(null, args);
    });
  }