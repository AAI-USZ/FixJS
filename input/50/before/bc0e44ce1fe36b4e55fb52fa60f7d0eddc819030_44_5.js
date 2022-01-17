function visibility(e) {
  if (document.mozHidden) {
    if (ActivityHandler.currentlyHandling)
      ActivityHandler.cancel();
  }
}