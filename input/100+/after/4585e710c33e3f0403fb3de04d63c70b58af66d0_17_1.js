function onSessionContext(msg, result) {
    var self=this;

    // defend against onSessionContext being called multiple times
    if (self.sessionContextHandled) return;
    self.sessionContextHandled = true;

    publishPreviousSession.call(self, result);
  }