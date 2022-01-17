function(serviceName, payload) {
  if (!this.isConnected()) {
    goog.net.xpc.logger.severe('Can\'t send. Channel not connected.');
    return;
  }
  // Check if the peer is still around.
  // NOTE(user): This check is not reliable in IE, where a document in an
  // iframe does not get unloaded when removing the iframe element from the DOM.
  // TODO(user): Find something that works in IE as well.
  // NOTE(user): "!this.peerWindowObject_.closed" evaluates to 'false' in IE9
  // sometimes even though typeof(this.peerWindowObject_.closed) is boolean and
  // this.peerWindowObject_.closed evaluates to 'false'. Casting it to a Boolean
  // results in sane evaluation. When this happens, it's in the inner iframe
  // when querying its parent's 'closed' status. Note that this is a different
  // case than mibuerge@'s note above.
  if (Boolean(this.peerWindowObject_.closed)) {
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