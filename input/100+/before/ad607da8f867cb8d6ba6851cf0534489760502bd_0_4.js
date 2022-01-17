function() {
  var peerCfg = {};
  peerCfg[goog.net.xpc.CfgFields.CHANNEL_NAME] = this.name;
  peerCfg[goog.net.xpc.CfgFields.TRANSPORT] =
      this.cfg_[goog.net.xpc.CfgFields.TRANSPORT];
  peerCfg[goog.net.xpc.CfgFields.ONE_SIDED_HANDSHAKE] =
      this.cfg_[goog.net.xpc.CfgFields.ONE_SIDED_HANDSHAKE];

  if (this.cfg_[goog.net.xpc.CfgFields.LOCAL_RELAY_URI]) {
    peerCfg[goog.net.xpc.CfgFields.PEER_RELAY_URI] =
        this.cfg_[goog.net.xpc.CfgFields.LOCAL_RELAY_URI];
  }
  if (this.cfg_[goog.net.xpc.CfgFields.LOCAL_POLL_URI]) {
    peerCfg[goog.net.xpc.CfgFields.PEER_POLL_URI] =
        this.cfg_[goog.net.xpc.CfgFields.LOCAL_POLL_URI];
  }
  if (this.cfg_[goog.net.xpc.CfgFields.PEER_POLL_URI]) {
    peerCfg[goog.net.xpc.CfgFields.LOCAL_POLL_URI] =
        this.cfg_[goog.net.xpc.CfgFields.PEER_POLL_URI];
  }
  var role = this.cfg_[goog.net.xpc.CfgFields.ROLE];
  if (role) {
    peerCfg[goog.net.xpc.CfgFields.ROLE] =
        role == goog.net.xpc.CrossPageChannelRole.INNER ?
            goog.net.xpc.CrossPageChannelRole.OUTER :
            goog.net.xpc.CrossPageChannelRole.INNER
  }

  return peerCfg;
}