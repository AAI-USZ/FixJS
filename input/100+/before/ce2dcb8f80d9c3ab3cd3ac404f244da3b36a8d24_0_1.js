function _fireNext($self) {
    var options = $self.data('eventStack').options;

    if (options.async) {
      // all fired already
      return;
    }

    var runningEvents = $self.data('eventStack').runningEvents;
    if (runningEvents.length == 0) {
      return;
    }

    var event = runningEvents[0];
    if (event.status === 'running') {
      return;
    }
    event.status = 'running';
    _fire(event, $self);
    if (!event.isAjax) {
      _complete(event, $self);
    }
  }