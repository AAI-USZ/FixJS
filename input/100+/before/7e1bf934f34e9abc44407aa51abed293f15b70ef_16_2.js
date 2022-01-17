function(test) {
  var myWindow;
  var finished = false;
  let browserWindow =  Cc["@mozilla.org/appshell/window-mediator;1"]
      .getService(Ci.nsIWindowMediator)
      .getMostRecentWindow("navigator:browser");
  var counter = 0;

  var delegate = {
    onTrack: function(window) {
      var type = window.document.documentElement.getAttribute("windowtype");
      if (type == "test:window")
        test.fail("onTrack shouldn't have been executed.");
    }
  };
  var wt = new windowUtils.WindowTracker(delegate);

  // make a new window
  myWindow = makeEmptyWindow();

  // make sure that the window hasn't loaded yet
  test.assertNotEqual(
      myWindow.document.readyState,
      "complete",
      "window hasn't loaded yet.");

  // unload WindowTracker
  wt.unload();

  // make sure that the window still hasn't loaded, which means that the onTrack
  // would have been removed successfully assuming that it doesn't execute.
  test.assertNotEqual(
      myWindow.document.readyState,
      "complete",
      "window still hasn't loaded yet.");

  // wait for the window to load and then close it. onTrack wouldn't be called
  // until the window loads, so we must let it load before closing it to be
  // certain that onTrack was removed.
  myWindow.addEventListener("load", function() {
    // allow all of the load handles to execute before closing
    myWindow.setTimeout(function() {
      myWindow.addEventListener("unload", function() {
        // once the window unloads test is done
        test.done();
      }, false);
      myWindow.close();
    }, 0);
  }, false);

  test.waitUntilDone(5000);
}