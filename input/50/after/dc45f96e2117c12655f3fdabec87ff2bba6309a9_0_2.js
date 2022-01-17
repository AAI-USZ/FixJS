function() {
    clearTimeout(self._state.tmrConn);
    self.debug&&self.debug('Connected to host.');
    self._state.conn.cleartext.write('');
    self._state.status = STATES.NOAUTH;
  }