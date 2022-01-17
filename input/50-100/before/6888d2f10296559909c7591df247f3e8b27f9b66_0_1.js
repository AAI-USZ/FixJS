function runTest() {
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