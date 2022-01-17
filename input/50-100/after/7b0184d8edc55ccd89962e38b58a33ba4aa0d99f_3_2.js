function() {
    createController({
      ready: function() {
        mediator.subscribe("start", function(msg, info) {
          ok(false, "start should not have been called");
        });

        var retval = controller.get(HTTP_TEST_DOMAIN, {
          termsOfService: "relative.html",
          privacyPolicy: "/privacy.html"
        });
        equal(retval, "relative urls not allowed: (relative.html)", "expected error");
        testErrorVisible();
        start();
      }
    });
  }