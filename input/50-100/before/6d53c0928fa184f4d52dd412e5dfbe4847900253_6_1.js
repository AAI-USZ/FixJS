function() {
      testEmail();
      ok($(".siteinfo").is(":visible"), "siteinfo is visible when we say what it is");
      equal($(".website:nth(0)").text(), returnTo, "website is updated");
      testHasClass("body", "complete");
      equal(doc.location.href, returnTo, "redirection occurred to correct URL");
      equal(storage.getLoggedIn("https://test.domain"), "testuser@testuser.com", "logged in status set");
      start();
    }