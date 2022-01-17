function errorHandler(err) {
    clearTimeout(self._state.tmrConn);
    if (self._state.status === STATES.NOCONNECT)
      loginCb(new Error('Unable to connect. Reason: ' + err));
    self.emit('error', err);
    self.debug('Error occurred: ' + err);
  }