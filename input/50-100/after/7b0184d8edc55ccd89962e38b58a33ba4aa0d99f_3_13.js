function() {
        mediator.subscribe("start", function(msg, info) {
          ok(false, "start should not have been called");
        });

        var retval = controller.get(HTTP_TEST_DOMAIN, {
          termsOfService: "/tos.html",
          privacyPolicy: "httpg://testdomain.com/privacy.html"
        });

        equal(retval, "relative urls not allowed: (httpg://testdomain.com/privacy.html)", "expected error");
        testErrorVisible();
        start();
      }