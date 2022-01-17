function() {
      testHelpers.testErrorVisible();

      // We have to make sure the error screen itself is visible and that the
      // extra info is hidden so when we click on the extra info it opens.
      $("#error").show();
      $("#error .moreInfo").hide();
      $("#error .openMoreInfo").trigger("click");

      // Add a bit of delay to wait for the animation
      setTimeout(function() {
        equal($("#error .moreInfo").is(":visible"), true, "extra info is visible after click");
        start();
      }, 100);

    }