function runTest() {
  // At the moment, this isn't going to work unless we're actually out of
  // process.
  //
  // With in-process mozbrowser, the root SHistory for an <iframe mozbrowser>
  // crosses the mozbrowser boundary.  It's like the mozbrowser wasn't there;
  // canGoBack reflects whether the top-level frame can go back, not whether the
  // iframe itself can go back.
  if (!browserElementTestHelpers.getOOPByDefaultPref()) {
    ok(false, "This test only works OOP.");
    return;
  }

  browserElementTestHelpers.setEnabledPref(true);
  browserElementTestHelpers.addToWhitelist();

  iframe = document.createElement('iframe');
  iframe.mozbrowser = true;

  addOneShotIframeEventListener('mozbrowserloadend', function() {
    SimpleTest.executeSoon(test2);
  });

  iframe.src = browserElementTestHelpers.emptyPage1;
  document.body.appendChild(iframe);
}