function() {
    createController({
      ready: function() {
        var startInfo;
        mediator.subscribe("start", function(msg, info) {
          startInfo = info;
        });

        var retval = controller.get(HTTP_TEST_DOMAIN, {
          tosURL: "/tos.html",
          privacyURL: "/privacy.html"
        });

        testHelpers.testObjectValuesEqual(startInfo, {
          tosURL: HTTP_TEST_DOMAIN + "/tos.html",
          privacyURL: HTTP_TEST_DOMAIN + "/privacy.html"
        });

        equal(typeof retval, "undefined", "no error expected");
        testErrorNotVisible();
        start();
      }
    });
  }