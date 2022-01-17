function _fireNext($self) {

    var runningEvents = $self.data('eventStack').runningEvents;
    if (runningEvents.length == 0) {
      return;
    }

    var event = runningEvents[0];
    if (event.status === 'running') {
      return;
    }
    _fire(event, $self);
  }