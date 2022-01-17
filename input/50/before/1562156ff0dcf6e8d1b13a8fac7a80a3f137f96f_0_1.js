function (method) {
    return $.proxy(CA.PeerConnection[method], this);
  }