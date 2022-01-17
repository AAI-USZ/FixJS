function() {
  buildUI(photodb);  // List files we already know about
  photodb.scan();    // Go look for more.

  // Since DeviceStorage doesn't send notifications yet, we're going
  // to rescan the files every time our app becomes visible again.
  // This means that if we switch to camera and take a photo, then when
  // we come back to gallery we should be able to find the new photo.
  // Eventually DeviceStorage will do notifications and MediaDB will
  // report them so we don't need to do this.
  document.addEventListener('mozvisibilitychange', function visibilityChange() {
    if (!document.mozHidden) {
      photodb.scan();
    }
  });
}