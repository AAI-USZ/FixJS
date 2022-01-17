function() {
    createController({
      ready: function() {
        var startInfo;
        mediator.subscribe("start", function(msg, info) {
          startInfo = info;
        });

        var retval = controller.get(HTTP_TEST_DOMAIN, {
          termsOfService: HTTPS_TEST_DOMAIN + "/tos.html",
          privacyPolicy: HTTPS_TEST_DOMAIN + "/privacy.html"
        });

        testHelpers.testObjectValuesEqual(startInfo, {
          termsOfService: HTTPS_TEST_DOMAIN + "/tos.html",
          privacyPolicy: HTTPS_TEST_DOMAIN + "/privacy.html"
        });
        equal(typeof retval, "undefined", "no error expected");
        testErrorNotVisible();
        start();
      }
    });
  }