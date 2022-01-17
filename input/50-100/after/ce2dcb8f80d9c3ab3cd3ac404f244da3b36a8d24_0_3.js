function _continue($self) {
    var options = $self.data('eventStack').options;

    if ($self.data('eventStack').status !== 'running') {
      return;
    }

    if (options.async) {
      // all fired already
      return;
    }

    _fireNext($self);

    
  }