function() {
    createController({
      ready: function() {
        mediator.subscribe("start", function(msg, info) {
          ok(false, "start should not have been called");
        });

        var retval = controller.get(HTTP_TEST_DOMAIN, {
          tosURL: "/tos.html",
          privacyURL: "javascript:alert(1)"
        });

        equal(retval, "relative urls not allowed: (javascript:alert(1))", "expected error");
        testErrorVisible();
        start();
      }
    });
  }