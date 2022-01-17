function() {
    createController({
      ready: function() {
        mediator.subscribe("start", function(msg, info) {
          ok(false, "start should not have been called");
        });

        var retval = controller.get(HTTP_TEST_DOMAIN, {
          tosURL: "relative.html<script>window.scriptRun=true;</script>",
          privacyURL: "/privacy.html"
        });

        // If tosURL is not properly escaped, scriptRun will be true.
        equal(typeof window.scriptRun, "undefined", "script was not run");
        equal(retval, "relative urls not allowed: (relative.html<script>window.scriptRun=true;</script>)", "expected error");
        testErrorVisible();
        start();
      }
    });
  }