function() {
    createController({
      ready: function() {
        mediator.subscribe("start", function(msg, info) {
          ok(false, "start should not have been called");
        });

        var siteLogo = '/i/card.png';
        var retval = controller.get(HTTP_TEST_DOMAIN, {
          siteLogo: siteLogo
        });

        equal(retval, "only https sites can specify a siteLogo", "expected error");
        testErrorVisible();
        start();
      }
    });
  }