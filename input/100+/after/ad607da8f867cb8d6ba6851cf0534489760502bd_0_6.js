function(serviceName, payload) {
  if (!this.isConnected()) {
    goog.net.xpc.logger.severe('Can\'t send. Channel not connected.');
    return;
  }
  // Check if the peer is still around.
  if (!this.isPeerAvailable()) {
    goog.net.xpc.logger.severe('Peer has disappeared.');
    this.close();
    return;
  }
  if (goog.isObject(payload)) {
    payload = goog.json.serialize(payload);
  }

  // Partially URL-encode the service name because some characters (: and |) are
  // used as delimiters for some transports, and we want to allow those
  // characters in service names.
  this.transport_.send(this.escapeServiceName_(serviceName), payload);
}