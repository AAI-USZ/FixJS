function _fire(event, $this) {
    var $self = $this.data('eventStack').target;

    var proceed = $self.triggerHandler('beforeTrigger.eventStack', event);
    if (proceed === false) {
      return;
    }
    (event.trigger)(event, $this);
    $self.triggerHandler('afterTrigger.eventStack', event);
  }