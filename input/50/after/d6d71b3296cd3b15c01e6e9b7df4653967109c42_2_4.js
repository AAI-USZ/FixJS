function doTestPC() {
  var pc = new CA.PeerConnection(CA.selectedMic, CA.selectedCam);
  var handler = function (offer) {
    log.debug("[CA] = Got an offer: " + offer);
  };
  pc.makeAnOffer(handler);
}