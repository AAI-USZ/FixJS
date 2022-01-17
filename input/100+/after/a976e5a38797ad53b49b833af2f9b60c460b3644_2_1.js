function() {
    var returnTo = "https://test.domain/path";
    storage.setReturnTo(returnTo);

    createController(config, function() {
      testVisible("#congrats");
      testHasClass("body", "complete");
      equal($(".website").text(), returnTo, "website is updated");
      equal(doc.location.href, returnTo, "redirection occurred to correct URL");
      equal(storage.getLoggedIn("https://test.domain"), "testuser@testuser.com", "logged in status set");
      start();
    });
  }