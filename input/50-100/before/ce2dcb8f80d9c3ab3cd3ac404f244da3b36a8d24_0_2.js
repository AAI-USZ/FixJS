function _complete(event, $self) {
    var runningEvents = $self.data('eventStack').runningEvents;

    if (event.status !== 'running') {
      throw 'EventStack: Unable to complete an event that is not running.';
    }
    event.status = 'ready';
    var pos = $.inArray(event, runningEvents);
    runningEvents.splice(pos, 1);

    _continue($self);
  }