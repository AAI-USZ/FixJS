function (msg) {
    // id, result or error. error has error (code), reason, details

    var self = this;
    // find the outstanding request
    // should be O(1) in nearly all realistic use cases
    var m;
    if (self.outstanding_wait_method &&
        self.outstanding_wait_method.msg.id === msg.id) {
      m = self.outstanding_wait_method;
      self.outstanding_wait_method_response = msg;
    } else {
      for (var i = 0; i < self.outstanding_methods.length; i++) {
        m = self.outstanding_methods[i];
        if (m.msg.id === msg.id)
          break;
      }

      // remove
      self.outstanding_methods.splice(i, 1);
    }

    if (!m) {
      Meteor._debug("Can't match method response to original method call", msg);
      return;
    }

    if (self.outstanding_wait_method) {
      // Wait until we have completed all outstanding methods.
      if (self.outstanding_methods.length === 0 &&
         self.outstanding_wait_method_response) {

        // Start by saving the outstanding wait method details, since
        // we're going to reshift the blocked ones and try to send
        // them *before* calling the method callback. It is necessary
        // to call method callbacks last since they might themselves
        // call other methods
        var savedOutstandingWaitMethod = self.outstanding_wait_method;
        var savedOutstandingWaitMethodResponse = self.outstanding_wait_method_response;
        self.outstanding_wait_method_response = null;
        self.outstanding_wait_method = null;

        // Find first blocked method with wait: true
        var i;
        for (i = 0; i < self.blocked_methods.length; i++)
          if (self.blocked_methods[i].wait)
            break;

        // Move as many blocked methods as we can into
        // outstanding_methods and outstanding_wait_method if needed
        self.outstanding_methods = _.first(self.blocked_methods, i);
        if (i !== self.blocked_methods.length) {
          self.outstanding_wait_method = self.blocked_methods[i];
          self.blocked_methods = _.rest(self.blocked_methods, i+1);
        }

        // Send any new outstanding methods after we reshift the
        // blocked methods.  Intentionally do this before calling the
        // method response because they might call additional methods
        // that shouldn't be sent twice.
        self._sendOutstandingMethods();

        // Fire necessary outstanding method callbacks, making sure we
        // only fire the outstanding wait method after all other outstanding
        // methods' callbacks were fired
        if (m === savedOutstandingWaitMethod) {
          self._deliverMethodResponse(savedOutstandingWaitMethod,
                       savedOutstandingWaitMethodResponse /*(=== msg)*/);
        } else {
          self._deliverMethodResponse(m, msg);
          self._deliverMethodResponse(savedOutstandingWaitMethod,
                       savedOutstandingWaitMethodResponse /*(!== msg)*/);
        }
      } else {
        if (m !== self.outstanding_wait_method)
          self._deliverMethodResponse(m, msg);
      }
    } else {
      self._deliverMethodResponse(m, msg);
    }

    // if we were blocking a migration, see if it's now possible to
    // continue
    if (self.retry_migrate && self._readyToMigrate()) {
      self.retry_migrate();
      self.retry_migrate = null;
    }
  }