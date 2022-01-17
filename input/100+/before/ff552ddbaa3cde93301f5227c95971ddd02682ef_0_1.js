function onhandshakestart() {
  debug('onhandshakestart');

  var self = this, ssl = this.ssl;
  ssl.handshakes++;

  if (ssl.handshakes === 1) {
    function timeout() {
      ssl.handshakes = 0;
      ssl.timer = null;
    }
    ssl.timer = setTimeout(timeout, exports.CLIENT_RENEG_WINDOW * 1000);
  }
  else if (ssl.handshakes >= exports.CLIENT_RENEG_LIMIT) {
    // Defer the error event to the next tick. We're being called from OpenSSL's
    // state machine and OpenSSL is not re-entrant. We cannot allow the user's
    // callback to destroy the connection right now, it would crash and burn.
    process.nextTick(function() {
      var err = new Error('TLS session renegotiation attack detected.');
      if (self.cleartext) self.cleartext.emit('error', err);
    });
  }
}