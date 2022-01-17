function(data, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }
  options = options || {};
  if (!('mailbox' in options)) {
    if (this._state.status !== STATES.BOXSELECTED)
      throw new Error('No mailbox specified or currently selected');
    else
      options.mailbox = this._state.box.name
  }
  cmd = 'APPEND "' + utils.escape(options.mailbox) + '"';
  if ('flags' in options) {
    if (!Array.isArray(options.flags))
      options.flags = Array(options.flags);
    cmd += " (\\" + options.flags.join(' \\') + ")";
  }
  if ('date' in options) {
    if (!(options.date instanceof Date))
      throw new Error('Expected null or Date object for date');
    cmd += ' "' + options.date.getDate() + '-'
           + utils.MONTHS[options.date.getMonth()]
           + '-' + options.date.getFullYear();
    cmd += ' ' + ('0' + options.date.getHours()).slice(-2) + ':'
           + ('0' + options.date.getMinutes()).slice(-2) + ':'
           + ('0' + options.date.getSeconds()).slice(-2);
    cmd += ((options.date.getTimezoneOffset() > 0) ? ' -' : ' +' );
    cmd += ('0' + (-options.date.getTimezoneOffset() / 60)).slice(-2);
    cmd += ('0' + (-options.date.getTimezoneOffset() % 60)).slice(-2);
    cmd += '"';
  }
  cmd += ' {';
  cmd += (Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data));
  cmd += '}';
  var self = this, step = 1;
  this._send(cmd, function(err) {
    if (err || step++ === 2)
      return cb(err);
    self._state.conn.cleartext.write(data);
    self._state.conn.cleartext.write(CRLF);
    self.debug&&self.debug('\nCLIENT: ' + util.inspect(data.toString()) + '\n');
  });
}