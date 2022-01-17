function (welcome_message) {
    var self = this;

    if (self.connection_timer) {
      clearTimeout(self.connection_timer);
      self.connection_timer = null;
    }
    if (self.heartbeat_timer)
      clearTimeout(self.heartbeat_timer);
    self.heartbeat_timer = setTimeout(
      _.bind(self._heartbeat_timeout, self),
      self.HEARTBEAT_TIMEOUT);


    if (self.current_status.connected) {
      // already connected. do nothing. this probably shouldn't happen.
      return;
    }

    // inspect the welcome data and decide if we have to reload
    try {
      var welcome_data = JSON.parse(welcome_message);
    } catch (err) {
      Meteor._debug("DEBUG: malformed welcome packet", welcome_message);
    }

    if (welcome_data && welcome_data.server_id) {
      if (!self.server_id)
        self.server_id = welcome_data.server_id;

      if (self.server_id && self.server_id !== welcome_data.server_id &&
          !self.sent_update_available) {
        self.update_available = true;
        _.each(self.event_callbacks.update_available,
               function (callback) { callback(); });
      }
    } else
      Meteor._debug("DEBUG: invalid welcome packet", welcome_data);

    // update status
    self.current_status.status = "connected";
    self.current_status.connected = true;
    self.current_status.retry_count = 0;
    self.status_changed();

    // fire resets. This must come after status change so that clients
    // can call send from within a reset callback.
    _.each(self.event_callbacks.reset, function (callback) { callback(); });

  }