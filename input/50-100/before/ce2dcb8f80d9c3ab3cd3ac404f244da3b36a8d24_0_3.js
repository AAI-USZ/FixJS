function _continue($self) {
    var runningEvents = $self.data('eventStack').runningEvents;

    if ($self.data('eventStack').status !== 'running') {
      return;
    }

    _fireNext($self);

    if (runningEvents.length == 0) {
      $self.data('eventStack').status = 'stopped';
      $self.triggerHandler('afterTriggerAll.eventStack');
      return;
    }
  }