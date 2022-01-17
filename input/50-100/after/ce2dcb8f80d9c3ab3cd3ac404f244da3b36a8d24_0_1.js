function _fire(event, $this) {
    var $self = $this.data('eventStack').target;

    event.status = 'running';
    var proceed = $self.triggerHandler('beforeTrigger.eventStack', event);
    if (proceed === false) {
      return;
    }
    (event.trigger)(event, $this);
    $self.triggerHandler('afterTrigger.eventStack', event);
    if (!event.isAjax) {
      _complete(event, $this);
    }
  }