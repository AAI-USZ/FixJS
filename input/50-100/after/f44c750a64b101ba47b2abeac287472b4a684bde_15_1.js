function(service, message, command, tag)
  {
    window.debug.log_transmit(service, message, command, tag);
    opera._debug_wrap_scopeTransmit(service, message, command, tag);
  }