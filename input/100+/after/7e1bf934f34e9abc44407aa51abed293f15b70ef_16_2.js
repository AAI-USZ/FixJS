function(test) {
  var myWindow;
  var tracks = 0;
  var unloadCalled = false;

  var delegate = {
    onTrack: function(window) {
      tracks = tracks + 1;
      if (window == myWindow) {
        test.pass("onTrack() called with our test window");
        timer.setTimeout(function() {
          myWindow.close();
        }, 1);
      }
    },
    onUntrack: function(window) {
      tracks = tracks - 1;
      if (window == myWindow && !unloadCalled) {
        unloadCalled = true;
        timer.setTimeout(function() {
          wt.unload();
        }, 1);
      }
      if (0 > tracks) {
        test.fail("WindowTracker onUntrack was called more times than onTrack..");
      }
      else if (0 == tracks) {
        timer.setTimeout(function() {
            myWindow = null;
            test.done();
        }, 1);
      }
    }
  };

  // test bug 638007 (new is optional), not using new
  var wt = windowUtils.WindowTracker(delegate);
  myWindow = makeEmptyWindow();
  test.waitUntilDone(5000);
}