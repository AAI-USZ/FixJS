function (method) {
    return $.proxy(CA.PeerConnection.prototype[method], this);
  }