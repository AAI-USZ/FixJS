function init () {

    // Only start downloading the swf file when the checked that this browser
    // actually supports it
    if (!FlashWS.loaded) {

      if (self.policyPort !== 843) {
        WebSocket.loadFlashPolicyFile('xmlsocket://' + self.host + ':' + self.policyPort);
      }

      WebSocket.__initialize();
      FlashWS.loaded = true;
    }

    fn.call(self);
  }