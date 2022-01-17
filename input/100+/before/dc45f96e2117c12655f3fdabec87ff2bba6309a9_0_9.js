function(cmdstr, cb, bypass) {
  if (cmdstr !== undefined && !bypass)
    this._state.requests.push({ command: cmdstr, callback: cb, args: [] });
  if (this._state.ext.idle.state === IDLE_WAIT)
    return;
  if ((cmdstr === undefined && this._state.requests.length) ||
      this._state.requests.length === 1 || bypass) {
    var prefix = '', cmd = (bypass ? cmdstr : this._state.requests[0].command);
    clearTimeout(this._state.tmrKeepalive);
    if (this._state.ext.idle.state === IDLE_READY && cmd !== 'DONE')
      return this._send('DONE', undefined, true);
    else if (cmd === 'IDLE') {
       // we use a different prefix to differentiate and disregard the tagged
       // response the server will send us when we issue DONE
      prefix = 'IDLE ';
      this._state.ext.idle.state = IDLE_WAIT;
    }
    if (cmd !== 'IDLE' && cmd !== 'DONE')
      prefix = 'A' + ++this._state.curId + ' ';
    this._state.conn.cleartext.write(prefix);
    this._state.conn.cleartext.write(cmd);
    this._state.conn.cleartext.write(CRLF);
    this.debug('\n<<SENT>>: ' + prefix + cmd + '\n');
  }
}