function(address, port, addressType, fd) {
  var r = 0;
  // assign handle in listen, and clean up if bind or listen fails
  var handle;

  if (typeof fd === 'number' && fd >= 0) {
    var tty_wrap = process.binding('tty_wrap');
    var type = tty_wrap.guessHandleType(fd);
    switch (type) {
      case 'PIPE':
        debug('listen pipe fd=' + fd);
        // create a PipeWrap
        handle = createPipe();
        handle.open(fd);
        handle.readable = true;
        handle.writable = true;
        break;

      default:
        // Not a fd we can listen on.  This will trigger an error.
        debug('listen invalid fd=' + fd + ' type=' + type);
        handle = null;
        break;
    }
    return handle;

  } else if (port == -1 && addressType == -1) {
    handle = createPipe();
    if (process.platform === 'win32') {
      var instances = parseInt(process.env.NODE_PENDING_PIPE_INSTANCES);
      if (!isNaN(instances)) {
        handle.setPendingInstances(instances);
      }
    }
  } else {
    handle = createTCP();
  }

  if (address || port) {
    debug('bind to ' + address);
    if (addressType == 6) {
      r = handle.bind6(address, port);
    } else {
      r = handle.bind(address, port);
    }
  }

  if (r) {
    handle.close();
    handle = null;
  }

  return handle;
}