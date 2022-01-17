function(frameName) {
  goog.net.xpc.logger.finest('checking for receive frame: ' + frameName);
  /** @preserveTry */
  try {
    var winObj = this.getPeerFrame_(frameName);
    if (!winObj || winObj.location.href.indexOf(this.rcvUri_) != 0) {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
}