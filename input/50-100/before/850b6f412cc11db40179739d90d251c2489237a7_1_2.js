function() {
    createController({
      ready: function() {
        var startInfo;
        mediator.subscribe("start", function(msg, info) {
          startInfo = info;
        });

        var siteLogo = '/i/card.png" onerror="alert(\'xss\')" <script>alert(\'more xss\')</script>';
        var retval = controller.get(HTTP_TEST_DOMAIN, {
          siteLogo: siteLogo
        });

        testHelpers.testObjectValuesEqual(startInfo, {
          siteLogo: encodeURI(HTTP_TEST_DOMAIN + siteLogo)
        });
        equal(typeof retval, "undefined", "no error expected");
        testErrorNotVisible();
        start();
      }
    });
  }