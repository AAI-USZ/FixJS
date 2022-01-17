function(err) {
    if (err || step++ === 2)
      return cb(err);
    self._state.conn.cleartext.write(data);
    self._state.conn.cleartext.write(CRLF);
    self.debug&&self.debug('\nCLIENT: ' + util.inspect(data.toString()) + '\n');
  }