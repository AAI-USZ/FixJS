function() {
    createController({
      ready: function() {
        mediator.subscribe("start", function(msg, info) {
          ok(false, "start should not have been called");
        });

        var retval = controller.get(HTTP_TEST_DOMAIN, {
          requiredEmail: "bademail"
        });
        equal(retval, "invalid requiredEmail: (bademail)", "expected error");
        testErrorVisible();
        start();
      }
    });
  }