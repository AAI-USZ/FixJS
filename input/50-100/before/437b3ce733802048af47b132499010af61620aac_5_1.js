function mb__cmd_tryToCreateAccount(msg) {
    var self = this;
    this.universe.tryToCreateAccount(msg.details, function(good, account) {
        self.__sendMessage({
            type: 'tryToCreateAccountResults',
            handle: msg.handle,
            error: good ? null : 'generic-badness',
          });
      });
  }