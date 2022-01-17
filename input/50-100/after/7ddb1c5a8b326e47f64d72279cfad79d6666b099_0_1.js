function() {
    var argString = "This is a string we'll send into and back from the dialog: " +
      (new Date()).toString();
    var windowName = "winchan window";

    WinChan.open({
      url: "cases/basic/child.html",
      relay_url: "/relay.html",
      window_name: windowName,
      window_features: "width=700,height=375",
      params: argString
    }, function(err, resp) {
      equal(resp, windowName + ": " + argString);
      start();
    });
  }