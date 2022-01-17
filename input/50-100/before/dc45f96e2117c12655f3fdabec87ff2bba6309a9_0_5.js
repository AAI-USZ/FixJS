function(err) {
    if (err || step++ === 2)
      return cb(err);
    self._state.conn.cleartext.write(data);
    self._state.conn.cleartext.write(CRLF);
    self.debug('\n<<SENT>>: ' + util.inspect(data.toString()) + '\n');
  }