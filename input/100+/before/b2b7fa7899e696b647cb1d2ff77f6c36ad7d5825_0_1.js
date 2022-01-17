function(msg, remote) {
  var req;

  debug('got a message', this._server);

  try {
    var packet = Packet.parse(msg, remote);
    req = this._active[packet.header.id];
    debug('associated message', packet.header.id);
  } catch (e) {
    debug('error parsing packet', e);
  }

  if (req) {
    this._active_count -= 1;
    req.handle(null, packet);
    this._fill();
  }

  this._unref();
}