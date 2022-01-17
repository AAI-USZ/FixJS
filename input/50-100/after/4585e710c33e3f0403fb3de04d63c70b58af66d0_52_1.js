function() {
    createController(true, { samplingEnabled: false });

    // the initial with_context will send off any stored data, there should be
    // no stored data.
    network.withContext(function() {
      controller.addEvent("after_session_context");

      equal(typeof controller.getCurrent(), "undefined", "no stored data");
      equal(typeof controller.getCurrentEventStream(), "undefined", "no data stored");

      controller.publishStored(function(status) {
        equal(status, false, "there was no data to publish");
        start();
      });
    });
  }